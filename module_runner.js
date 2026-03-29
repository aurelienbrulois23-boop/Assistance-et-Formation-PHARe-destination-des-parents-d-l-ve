(function(){
  var config = window.PIX_PARENTS_MODULE;
  if(!config){
    document.body.innerHTML = '<main style="padding:24px;font-family:sans-serif;color:#fff;background:#101820">Configuration du module absente.</main>';
    return;
  }

  var e = React.createElement;
  var CERT_PREFIX = config.certPrefix || 'CERT_PARENTS_';
  var PLAYER_KEY = config.playerKey || 'pvs_parents_player';
  var CURRENT_PLAYER_KEY = 'pvs_current_player';
  var PLAYER_STATE_PREFIX = config.playerStatePrefix || 'PVS_PARENTS_STATE::';
  var SYNCED_PREFIX = config.syncedPrefix || 'PVS_PARENTS_SYNCED::';
  var catalog = Array.isArray(config.catalog) ? config.catalog.slice() : [{ id:config.id, xp:config.xp || 0, title:config.title || config.id }];

  function parseJson(raw, fallback){
    if(!raw){ return fallback; }
    try{ return JSON.parse(raw); }catch(err){ return fallback; }
  }

  function normalizePlayer(player){
    return (player || '').trim();
  }

  function playerStateKey(player){
    return PLAYER_STATE_PREFIX + normalizePlayer(player).toLowerCase();
  }

  function syncedModulesKey(player){
    return SYNCED_PREFIX + normalizePlayer(player).toLowerCase();
  }

  function certKey(id){
    return CERT_PREFIX + id;
  }

  function setStoredPlayer(player){
    if(!player){ return; }
    localStorage.setItem(CURRENT_PLAYER_KEY, player);
    localStorage.setItem(PLAYER_KEY, player);
  }

  function getPlayer(){
    try{
      var params = new URLSearchParams(window.location.search);
      var fromUrl = normalizePlayer(params.get('player'));
      if(fromUrl){
        setStoredPlayer(fromUrl);
        return fromUrl;
      }
    }catch(err){}
    return normalizePlayer(localStorage.getItem(CURRENT_PLAYER_KEY) || localStorage.getItem(PLAYER_KEY) || 'Parent local');
  }

  function clearAllModuleCerts(){
    catalog.forEach(function(module){
      localStorage.removeItem(certKey(module.id));
    });
  }

  function readSnapshot(player){
    return parseJson(localStorage.getItem(playerStateKey(player)), null);
  }

  function readSyncedSet(player){
    var values = parseJson(localStorage.getItem(syncedModulesKey(player)), []);
    return new Set(Array.isArray(values) ? values : []);
  }

  function writeSyncedSet(player, values){
    localStorage.setItem(syncedModulesKey(player), JSON.stringify(Array.from(values)));
  }

  function readModuleCert(id){
    return parseJson(localStorage.getItem(certKey(id)), null);
  }

  function isCompletedByPlayer(id, player){
    var cert = readModuleCert(id);
    return !!(cert && (!player || !cert.n || cert.n === player));
  }

  function completedModuleIds(player){
    var done = [];
    catalog.forEach(function(module){
      if(isCompletedByPlayer(module.id, player)){
        done.push(module.id);
      }
    });
    return done;
  }

  function writeSnapshot(player){
    var normalized = normalizePlayer(player);
    if(!normalized){ return; }
    localStorage.setItem(playerStateKey(normalized), JSON.stringify({
      v:1,
      player:normalized,
      completedModules:completedModuleIds(normalized),
      updatedAt:new Date().toISOString()
    }));
  }

  function restorePlayerState(player){
    var normalized = normalizePlayer(player);
    if(!normalized){ return; }
    clearAllModuleCerts();
    var snapshot = readSnapshot(normalized);
    if(!snapshot || !Array.isArray(snapshot.completedModules)){ return; }
    snapshot.completedModules.forEach(function(moduleId){
      localStorage.setItem(certKey(moduleId), JSON.stringify({
        v:1,
        d:snapshot.updatedAt || new Date().toISOString(),
        m:moduleId,
        n:normalized,
        f:true
      }));
    });
  }

  function computeStats(player){
    var xpTotal = 0;
    var completedCount = 0;
    catalog.forEach(function(module){
      if(isCompletedByPlayer(module.id, player)){
        completedCount += 1;
        xpTotal += module.xp || 0;
      }
    });
    return {
      completedCount:completedCount,
      hubXpTotal:xpTotal
    };
  }

  function pushBridgeEvent(player, stats){
    var events = parseJson(localStorage.getItem('pvs_bridge_events'), []);
    events.push({
      id:'PARENTS-' + config.id + '-' + Date.now(),
      type:config.eventType || 'PARENTS_PROGRESS',
      hub:config.hubId || 'PIX_PARENTS',
      player:player,
      module:config.id,
      label:(config.hubLabel || 'PIX Parents') + ' : ' + (config.title || config.id),
      cpTotal:stats.completedCount,
      hubXpTotal:stats.hubXpTotal,
      d:new Date().toISOString()
    });
    if(events.length > 700){
      events.splice(0, events.length - 700);
    }
    localStorage.setItem('pvs_bridge_events', JSON.stringify(events));
    try{
      window.dispatchEvent(new StorageEvent('storage', { key:'pvs_bridge_events' }));
    }catch(err){}
  }

  function markModuleSynced(player){
    var synced = readSyncedSet(player);
    synced.add(config.id);
    writeSyncedSet(player, synced);
  }

  function hasModuleBeenSynced(player){
    return readSyncedSet(player).has(config.id);
  }

  function goBack(){
    var player = getPlayer();
    var separator = config.backUrl.indexOf('?') === -1 ? '?' : '&';
    window.location.href = player ? config.backUrl + separator + 'player=' + encodeURIComponent(player) : config.backUrl;
  }

  function applyTheme(){
    var theme = config.theme || {};
    var root = document.documentElement;
    if(theme.accent){ root.style.setProperty('--accent', theme.accent); }
    if(theme.accentDark){ root.style.setProperty('--accent-dark', theme.accentDark); }
    if(theme.gold){ root.style.setProperty('--gold', theme.gold); }
    if(theme.bg){ root.style.setProperty('--bg', theme.bg); }
    if(theme.bg2){ root.style.setProperty('--bg-2', theme.bg2); }
    if(theme.card){ root.style.setProperty('--card', theme.card); }
    if(theme.watermark){ root.style.setProperty('--watermark', theme.watermark); }
  }

  function scoreMessage(score, maxScore){
    var ratio = maxScore ? (score / maxScore) : 0;
    if(ratio >= 0.8){ return 'Réflexes solides. Vous posez un cadre adulte protecteur sans accélérer inutilement la crise.'; }
    if(ratio >= 0.55){ return 'Bonne base. Quelques ajustements de posture peuvent encore mieux soutenir votre enfant.'; }
    return 'Les intuitions sont là, mais le module montre des leviers plus protecteurs à consolider.';
  }

  setStoredPlayer(getPlayer());
  restorePlayerState(getPlayer());
  applyTheme();

  function App(){
    var stepState = React.useState('intro');
    var step = stepState[0];
    var setStep = stepState[1];
    var indexState = React.useState(0);
    var scenarioIndex = indexState[0];
    var setScenarioIndex = indexState[1];
    var scoreState = React.useState(0);
    var score = scoreState[0];
    var setScore = scoreState[1];
    var feedbackState = React.useState(null);
    var feedback = feedbackState[0];
    var setFeedback = feedbackState[1];

    var player = getPlayer();
    var totalSteps = config.scenarios.length;

    function finishModule(){
      var alreadyDone = isCompletedByPlayer(config.id, player);
      localStorage.setItem(certKey(config.id), JSON.stringify({
        v:2,
        d:new Date().toISOString(),
        m:config.id,
        n:player,
        f:true
      }));
      writeSnapshot(player);
      if(!alreadyDone && !hasModuleBeenSynced(player)){
        pushBridgeEvent(player, computeStats(player));
        markModuleSynced(player);
      }
      setStep('complete');
    }

    function chooseOption(option){
      setScore(score + (option.score || 0));
      setFeedback(option);
    }

    function nextScenario(){
      setFeedback(null);
      if(scenarioIndex < totalSteps - 1){
        setScenarioIndex(scenarioIndex + 1);
      }else{
        setStep('synthesis');
      }
    }

    function renderIntro(){
      return e('div', { className:'card', 'data-watermark':config.watermark || 'PIX Parents' },
        e('div', { className:'top-row' },
          e('button', { className:'back-btn', onClick:goBack }, '\u2190 Retour au hub'),
          e('div', { className:'player-chip' }, player)
        ),
        e('div', { className:'kicker' }, config.kicker || ''),
        e('h1', null, config.title),
        config.quote ? e('p', { className:'quote' }, config.quote) : null,
        (config.intro || []).map(function(paragraph, idx){
          return e('p', { key:'intro-' + idx }, paragraph);
        }),
        config.insight ? e('div', { className:'insight-box' }, e('strong', null, 'Repère utile. '), config.insight) : null,
        e('div', { className:'badge-row' },
          e('div', { className:'xp-badge' }, '+' + (config.xp || 0) + ' XP'),
          (config.earns || []).map(function(item, idx){
            return e('div', { key:'earn-' + idx, className:'earn-chip' }, '+' + item);
          })
        ),
        e('button', { className:'primary-btn', onClick:function(){ setStep('scenario'); } }, 'Commencer le module')
      );
    }

    function renderScenario(){
      var scenario = config.scenarios[scenarioIndex];
      var progress = 14 + Math.round(((scenarioIndex + (feedback ? 1 : 0)) / totalSteps) * 70);
      return e('div', { className:'card', 'data-watermark':config.watermark || 'PIX Parents' },
        e('div', { className:'progress' }, e('div', { className:'progress-fill', style:{ width:progress + '%' } })),
        e('div', { className:'step-tag' }, 'Scénario ' + (scenarioIndex + 1) + ' / ' + totalSteps),
        e('div', { className:'context-box' }, e('strong', null, 'Contexte. '), scenario.context),
        e('h2', null, scenario.question),
        !feedback ?
          e('div', { className:'option-list' },
            scenario.options.map(function(option, idx){
              return e('button', {
                key:'option-' + idx,
                className:'option-btn',
                onClick:function(){ chooseOption(option); }
              },
              e('span', { className:'option-label' }, option.label),
              option.text);
            })
          ) :
          e('div', null,
            e('div', { className:'feedback-box ' + (feedback.good ? 'good' : 'warn') },
              e('strong', null, feedback.good ? 'Posture protectrice.' : 'Point de vigilance.'),
              e('p', { style:{ marginTop:'8px', marginBottom:0 } }, feedback.feedback)
            ),
            e('button', { className:'primary-btn', onClick:nextScenario }, scenarioIndex < totalSteps - 1 ? 'Scénario suivant' : 'Aller à la synthèse')
          )
      );
    }

    function renderSynthesis(){
      var maxScore = totalSteps * 3;
      var percent = Math.round((score / maxScore) * 100);
      return e('div', { className:'card', 'data-watermark':config.watermark || 'PIX Parents' },
        e('div', { className:'progress' }, e('div', { className:'progress-fill', style:{ width:'90%' } })),
        e('div', { className:'step-tag' }, 'Synthèse'),
        e('h2', null, 'Ce qu’il faut retenir'),
        e('div', { className:'insight-box' },
          e('strong', null, 'Score : '),
          score + ' / ' + maxScore + ' (' + percent + '%). ' + scoreMessage(score, maxScore)
        ),
        e('div', { className:'synthesis-list' },
          (config.synthesis || []).map(function(item, idx){
            return e('div', { key:'synth-' + idx, className:'synthesis-item' },
              e('strong', null, item.title + ' '),
              item.text
            );
          })
        ),
        e('button', { className:'primary-btn', onClick:finishModule }, 'Valider ce module')
      );
    }

    function renderComplete(){
      return e('div', { className:'card centered', 'data-watermark':config.watermark || 'PIX Parents' },
        e('div', { className:'seal' }, config.seal || '\u2726'),
        e('h1', null, 'Module validé'),
        e('p', null, config.completionText || 'La progression a été enregistrée automatiquement pour ce parent.'),
        e('div', { className:'badge-row', style:{ justifyContent:'center' } },
          e('div', { className:'xp-badge' }, '+' + (config.xp || 0) + ' XP'),
          (config.earns || []).map(function(item, idx){
            return e('div', { key:'complete-' + idx, className:'earn-chip' }, '+' + item);
          })
        ),
        e('button', { className:'primary-btn', onClick:goBack }, '\u2190 Retour au hub')
      );
    }

    if(step === 'scenario'){ return renderScenario(); }
    if(step === 'synthesis'){ return renderSynthesis(); }
    if(step === 'complete'){ return renderComplete(); }
    return renderIntro();
  }

  ReactDOM.createRoot(document.getElementById('root')).render(e(App));
})();
