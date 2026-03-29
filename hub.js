(function(){
  var HUB_ID = 'PIX_PARENTS';
  var CERT_PREFIX = 'CERT_PARENTS_';
  var PLAYER_KEY = 'pvs_parents_player';
  var CURRENT_PLAYER_KEY = 'pvs_current_player';
  var PLAYER_STATE_PREFIX = 'PVS_PARENTS_STATE::';
  var SYNCED_PREFIX = 'PVS_PARENTS_SYNCED::';
  var RECENT_PLAYERS_KEY = 'PVS_PARENTS_RECENT_PLAYERS';

  var MODULES = [
    {
      id:'PARENTS_REP01',
      file:'PARENTS_REP01.html',
      title:'Repérer les signaux faibles sans dramatiser',
      summary:'Transformer une inquiétude diffuse en faits observables : sommeil, évitement, somatisations, habitudes numériques, changements relationnels.',
      pillar:'observer',
      xp:90,
      duration:'12 min',
      tags:['signaux faibles', 'chronologie', 'observation'],
      requires:[]
    },
    {
      id:'PARENTS_DIA01',
      file:'PARENTS_DIA01.html',
      title:'Parler sans fermer la parole',
      summary:'Installer une conversation qui protège : questions ouvertes, cadre émotionnel, co-décisions et refus de la posture d’interrogatoire.',
      pillar:'dialoguer',
      xp:90,
      duration:'12 min',
      tags:['dialogue', 'écoute', 'cadre adulte'],
      requires:['PARENTS_REP01']
    },
    {
      id:'PARENTS_NUM01',
      file:'PARENTS_NUM01.html',
      title:'Cyberharcèlement : preuves, signalement, 3018',
      summary:'Conserver les preuves utiles, limiter la diffusion, mobiliser les bons outils et agir sans effacer trop vite ce qui permettra de protéger.',
      pillar:'numerique',
      xp:95,
      duration:'13 min',
      tags:['captures', 'réseaux sociaux', '3018'],
      requires:['PARENTS_DIA01']
    },
    {
      id:'PARENTS_ACT01',
      file:'PARENTS_ACT01.html',
      title:'Coopérer avec l’établissement sans perdre le fil',
      summary:'Arriver avec une chronologie claire, demander des mesures concrètes, suivre la situation et éviter les guerres parallèles entre adultes.',
      pillar:'cooperer',
      xp:95,
      duration:'12 min',
      tags:['CPE', 'chef d’établissement', 'suivi'],
      requires:['PARENTS_NUM01']
    },
    {
      id:'PARENTS_RES01',
      file:'PARENTS_RES01.html',
      title:'Soutenir son enfant dans la durée',
      summary:'Après l’urgence, reconstruire le sentiment de sécurité, les routines, l’estime de soi et les relais utiles à la maison comme à l’école.',
      pillar:'reconstruire',
      xp:100,
      duration:'14 min',
      tags:['réparation', 'routines', 'retour à l’école'],
      requires:['PARENTS_ACT01']
    },
    {
      id:'PARENTS_REP02',
      file:'PARENTS_REP02.html',
      title:'Comprendre le cerveau ado quand il se ferme, explose ou minimise',
      summary:'Lire autrement le retrait, la colère, la honte et l’hypervigilance : comprendre sans excuser, pour mieux protéger.',
      pillar:'observer',
      xp:100,
      duration:'13 min',
      tags:['cerveau ado', 'stress', 'honte'],
      requires:['PARENTS_RES01']
    },
    {
      id:'PARENTS_DIA02',
      file:'PARENTS_DIA02.html',
      title:'Rouvrir la parole : émotions, honte et co-régulation',
      summary:'Aider un adolescent à trouver des mots, garder un cadre adulte, et ne pas promettre l’impossible quand la sécurité est en jeu.',
      pillar:'dialoguer',
      xp:100,
      duration:'13 min',
      tags:['émotions', 'honte', 'co-régulation'],
      requires:['PARENTS_REP02']
    },
    {
      id:'PARENTS_NUM02',
      file:'PARENTS_NUM02.html',
      title:'Numérique côté adultes : protéger sans surexposer',
      summary:'Distinguer preuve et publicité, éviter les tribunaux parentaux et protéger l’enfant sans faire circuler davantage l’humiliation.',
      pillar:'numerique',
      xp:105,
      duration:'13 min',
      tags:['preuves', 'WhatsApp', 'surexposition'],
      requires:['PARENTS_DIA02']
    },
    {
      id:'PARENTS_ACT02',
      file:'PARENTS_ACT02.html',
      title:'Autour de l’enfant : quels relais activer, à quel moment ?',
      summary:'Choisir le bon partenaire selon le besoin du moment : établissement, PsyEN, MDA, CMP, ou alerte de protection si le danger devient grave.',
      pillar:'cooperer',
      xp:110,
      duration:'14 min',
      tags:['PsyEN', 'MDA', 'CMP'],
      requires:['PARENTS_NUM02']
    },
    {
      id:'PARENTS_RES02',
      file:'PARENTS_RES02.html',
      title:'Après la crise : remettre l’orientation et l’avenir en mouvement',
      summary:'Rouvrir la projection par petites prises : goûts, lieux supportables, mini-stages, mobilité, internat et rythme réaliste.',
      pillar:'reconstruire',
      xp:120,
      duration:'15 min',
      tags:['orientation', 'projection', 'mini-stages'],
      requires:['PARENTS_ACT02']
    }
  ];

  var PILLARS = [
    {
      id:'observer',
      title:'Observer et repérer',
      icon:'◌',
      accent:'#c48ef2',
      description:'Sortir des intuitions floues. On apprend à voir les répétitions, les bascules de comportement et ce que le stress adolescent fait au corps et à la parole.',
      tag:'Fondation'
    },
    {
      id:'dialoguer',
      title:'Parler et réguler',
      icon:'◍',
      accent:'#79b6ff',
      description:'On installe une parole respirable : questions ouvertes, émotions plus fines, place de la honte et co-régulation adulte.',
      tag:'Relation'
    },
    {
      id:'numerique',
      title:'Protéger en ligne',
      icon:'◆',
      accent:'#d79a4a',
      description:'Du repérage des preuves à la gestion des groupes de parents, ce bloc vise des réflexes utiles, documentés et calmes.',
      tag:'Protection'
    },
    {
      id:'cooperer',
      title:'Coopérer et relayer',
      icon:'◇',
      accent:'#efad72',
      description:'La famille n’a pas à tout porter seule. On clarifie les échanges avec l’établissement et les relais utiles autour de l’adolescent.',
      tag:'Coordination'
    },
    {
      id:'reconstruire',
      title:'Soutenir et reconstruire',
      icon:'△',
      accent:'#7fb8a8',
      description:'La sortie de crise se joue aussi dans la durée : sécurité, routines, estime de soi et capacité à se projeter à nouveau.',
      tag:'Stabilisation'
    }
  ];

  function parseJson(raw, fallback){
    if(!raw){ return fallback; }
    try{ return JSON.parse(raw); }catch(err){ return fallback; }
  }

  function normalizePlayer(player){
    return (player || '').trim();
  }

  function slugifyFilePart(text){
    return normalizePlayer(text)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'parent';
  }

  function certKey(id){
    return CERT_PREFIX + id;
  }

  function playerStateKey(player){
    return PLAYER_STATE_PREFIX + normalizePlayer(player).toLowerCase();
  }

  function syncedModulesKey(player){
    return SYNCED_PREFIX + normalizePlayer(player).toLowerCase();
  }

  function currentPlayer(){
    try{
      var params = new URLSearchParams(window.location.search);
      var playerFromUrl = normalizePlayer(params.get('player'));
      if(playerFromUrl){
        setStoredPlayer(playerFromUrl);
        return playerFromUrl;
      }
    }catch(err){}
    return normalizePlayer(localStorage.getItem(CURRENT_PLAYER_KEY) || localStorage.getItem(PLAYER_KEY) || '');
  }

  function setStoredPlayer(player){
    var normalized = normalizePlayer(player);
    if(!normalized){ return; }
    localStorage.setItem(CURRENT_PLAYER_KEY, normalized);
    localStorage.setItem(PLAYER_KEY, normalized);
  }

  function clearStoredPlayer(){
    localStorage.removeItem(CURRENT_PLAYER_KEY);
    localStorage.removeItem(PLAYER_KEY);
  }

  function readModuleCert(id){
    return parseJson(localStorage.getItem(certKey(id)), null);
  }

  function clearAllModuleCerts(){
    MODULES.forEach(function(module){
      localStorage.removeItem(certKey(module.id));
    });
  }

  function readCompletedModules(player){
    var normalized = normalizePlayer(player);
    return MODULES.filter(function(module){
      var cert = readModuleCert(module.id);
      return !!(cert && (!normalized || !cert.n || cert.n === normalized));
    }).map(function(module){ return module.id; });
  }

  function writeSnapshot(player, completedModuleIds){
    var normalized = normalizePlayer(player);
    if(!normalized){ return; }
    localStorage.setItem(playerStateKey(normalized), JSON.stringify({
      v:1,
      player:normalized,
      completedModules:completedModuleIds.slice(),
      updatedAt:new Date().toISOString()
    }));
  }

  function restorePlayerState(player){
    var normalized = normalizePlayer(player);
    clearAllModuleCerts();
    if(!normalized){ return; }
    var snapshot = parseJson(localStorage.getItem(playerStateKey(normalized)), null);
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

  function syncCurrentPlayerState(){
    var player = currentPlayer();
    if(!player){ return; }
    writeSnapshot(player, readCompletedModules(player));
  }

  function addRecentPlayer(player){
    var normalized = normalizePlayer(player);
    if(!normalized){ return; }
    var values = parseJson(localStorage.getItem(RECENT_PLAYERS_KEY), []);
    values = Array.isArray(values) ? values.filter(function(entry){ return entry && entry.toLowerCase() !== normalized.toLowerCase(); }) : [];
    values.unshift(normalized);
    localStorage.setItem(RECENT_PLAYERS_KEY, JSON.stringify(values.slice(0, 8)));
  }

  function recentPlayers(){
    var values = parseJson(localStorage.getItem(RECENT_PLAYERS_KEY), []);
    return Array.isArray(values) ? values : [];
  }

  function readSyncedSet(player){
    var values = parseJson(localStorage.getItem(syncedModulesKey(player)), []);
    return new Set(Array.isArray(values) ? values : []);
  }

  function writeSyncedSet(player, values){
    localStorage.setItem(syncedModulesKey(player), JSON.stringify(Array.from(values)));
  }

  function clearSyncedSet(player){
    localStorage.removeItem(syncedModulesKey(player));
  }

  function knownModuleIds(){
    return new Set(MODULES.map(function(module){ return module.id; }));
  }

  function sanitizeModuleIds(values){
    var known = knownModuleIds();
    var seen = new Set();
    return (Array.isArray(values) ? values : []).filter(function(id){
      return typeof id === 'string' && known.has(id) && !seen.has(id) && seen.add(id);
    });
  }

  function snapshotForPlayer(player){
    var normalized = normalizePlayer(player);
    if(!normalized){ return null; }
    syncCurrentPlayerState();
    var snapshot = parseJson(localStorage.getItem(playerStateKey(normalized)), null) || {
      v:1,
      player:normalized,
      completedModules:readCompletedModules(normalized),
      updatedAt:new Date().toISOString()
    };
    snapshot.player = normalized;
    snapshot.completedModules = sanitizeModuleIds(snapshot.completedModules);
    return snapshot;
  }

  function setSaveStatus(message, tone){
    var status = document.getElementById('save-status');
    if(!status){ return; }
    status.textContent = message;
    status.classList.remove('ok', 'warn', 'bad');
    if(tone){ status.classList.add(tone); }
  }

  function buildExportPayload(player){
    var snapshot = snapshotForPlayer(player);
    if(!snapshot){ return null; }
    return {
      type:'PIX_PARENTS_SAVE',
      hub:HUB_ID,
      version:2,
      player:snapshot.player,
      completedModules:snapshot.completedModules,
      syncedModules:sanitizeModuleIds(Array.from(readSyncedSet(snapshot.player))),
      updatedAt:snapshot.updatedAt || new Date().toISOString(),
      exportedAt:new Date().toISOString()
    };
  }

  function downloadCurrentSave(){
    var player = currentPlayer();
    if(!player){
      setSaveStatus('Ouvrez d’abord une session parent avant de télécharger une sauvegarde.', 'warn');
      return;
    }
    var payload = buildExportPayload(player);
    if(!payload){
      setSaveStatus('Impossible de préparer la sauvegarde pour cette session.', 'bad');
      return;
    }
    var filename = 'pix-parents-' + slugifyFilePart(player) + '-' + new Date().toISOString().slice(0, 10) + '.json';
    var blob = new Blob([JSON.stringify(payload, null, 2)], { type:'application/json;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(function(){ URL.revokeObjectURL(url); }, 500);
    setSaveStatus('Sauvegarde téléchargée pour ' + player + '. Conservez bien le fichier sur votre PC ou une clé USB.', 'ok');
  }

  function importSavePayload(payload){
    if(!payload || typeof payload !== 'object'){
      throw new Error('Fichier de sauvegarde illisible.');
    }
    if(payload.hub !== HUB_ID && payload.type !== 'PIX_PARENTS_SAVE'){
      throw new Error('Ce fichier ne semble pas provenir de PIX Parents.');
    }
    var player = normalizePlayer(payload.player);
    if(!player){
      throw new Error('Le fichier ne contient pas d’identifiant parent utilisable.');
    }
    var completed = sanitizeModuleIds(payload.completedModules);
    var syncedSource = Array.isArray(payload.syncedModules) ? payload.syncedModules : completed;
    var synced = sanitizeModuleIds(syncedSource).filter(function(id){ return completed.indexOf(id) !== -1; });
    var current = currentPlayer();
    if(current && current.toLowerCase() !== player.toLowerCase()){
      var ok = window.confirm('Charger la sauvegarde de ' + player + ' et remplacer la session actuellement ouverte sur ce navigateur ?');
      if(!ok){ return false; }
    }
    localStorage.setItem(playerStateKey(player), JSON.stringify({
      v:1,
      player:player,
      completedModules:completed,
      updatedAt:payload.updatedAt || new Date().toISOString()
    }));
    writeSyncedSet(player, new Set(synced));
    setStoredPlayer(player);
    addRecentPlayer(player);
    restorePlayerState(player);
    render();
    setSaveStatus('Sauvegarde chargée pour ' + player + '. La progression locale est restaurée sur ce navigateur.', 'ok');
    return true;
  }

  function handleSaveFileSelection(evt){
    var file = evt.target.files && evt.target.files[0];
    if(!file){ return; }
    var reader = new FileReader();
    reader.onload = function(loadEvt){
      try{
        var payload = JSON.parse(String(loadEvt.target.result || ''));
        importSavePayload(payload);
      }catch(err){
        setSaveStatus(err && err.message ? err.message : 'Impossible de charger ce fichier de sauvegarde.', 'bad');
      }finally{
        evt.target.value = '';
      }
    };
    reader.onerror = function(){
      evt.target.value = '';
      setSaveStatus('Lecture du fichier impossible. Réessayez avec une sauvegarde JSON de PIX Parents.', 'bad');
    };
    reader.readAsText(file, 'utf-8');
  }

  function completedSet(player){
    return new Set(readCompletedModules(player));
  }

  function moduleById(id){
    return MODULES.find(function(module){ return module.id === id; });
  }

  function isUnlocked(module, doneSet){
    return (module.requires || []).every(function(requiredId){ return doneSet.has(requiredId); });
  }

  function computeStats(player){
    var done = completedSet(player);
    var totalXp = 0;
    MODULES.forEach(function(module){
      if(done.has(module.id)){ totalXp += module.xp || 0; }
    });
    return {
      completed:done.size,
      total:MODULES.length,
      xp:totalXp,
      remaining:MODULES.length - done.size
    };
  }

  function nextModule(player){
    var done = completedSet(player);
    return MODULES.find(function(module){
      return !done.has(module.id) && isUnlocked(module, done);
    }) || null;
  }

  function queueBridgeEvent(module, player, stats){
    var events = parseJson(localStorage.getItem('pvs_bridge_events'), []);
    events.push({
      id:'PARENTS-SYNC-' + module.id + '-' + Date.now(),
      type:'PARENTS_PROGRESS',
      hub:HUB_ID,
      player:player,
      module:module.id,
      label:'PIX Parents : ' + module.title,
      cpTotal:stats.completed,
      hubXpTotal:stats.xp,
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

  function syncBridgeForCurrentPlayer(){
    var player = currentPlayer();
    if(!player){ return; }
    var stats = computeStats(player);
    var done = completedSet(player);
    var synced = readSyncedSet(player);
    var dirty = false;
    MODULES.forEach(function(module){
      if(done.has(module.id) && !synced.has(module.id)){
        queueBridgeEvent(module, player, stats);
        synced.add(module.id);
        dirty = true;
      }
    });
    if(dirty){
      writeSyncedSet(player, synced);
    }
  }

  function setCurrentPlayer(player){
    var normalized = normalizePlayer(player);
    if(!normalized){ return; }
    setStoredPlayer(normalized);
    addRecentPlayer(normalized);
    restorePlayerState(normalized);
    syncBridgeForCurrentPlayer();
    render();
  }

  function launchModule(moduleId){
    var player = currentPlayer();
    if(!player){
      var input = document.getElementById('player-input');
      if(input){
        input.focus();
        input.scrollIntoView({ behavior:'smooth', block:'center' });
      }
      return;
    }
    syncCurrentPlayerState();
    var module = moduleById(moduleId);
    if(!module){ return; }
    window.location.href = module.file + '?player=' + encodeURIComponent(player);
  }

  function resetCurrentProgress(){
    var player = currentPlayer();
    if(!player){ return; }
    if(!window.confirm('Réinitialiser la progression locale de ' + player + ' dans PIX Parents ?')){
      return;
    }
    writeSnapshot(player, []);
    clearSyncedSet(player);
    restorePlayerState(player);
    render();
  }

  function logoutCurrentPlayer(){
    clearStoredPlayer();
    clearAllModuleCerts();
    render();
  }

  function handleSessionSubmit(evt){
    evt.preventDefault();
    var input = document.getElementById('player-input');
    if(!input){ return; }
    var value = normalizePlayer(input.value);
    if(!value){
      input.focus();
      return;
    }
    setCurrentPlayer(value);
  }

  function renderHero(){
    var player = currentPlayer();
    var stats = computeStats(player);
    var next = nextModule(player);
    document.getElementById('hero-greeting').textContent = player ? ('Parcours actif pour ' + player) : 'Un hub autonome, clair et adulte pour les familles';
    document.getElementById('hero-status').innerHTML = player ? (
      '<span class="status-chip">' + stats.completed + ' / ' + stats.total + ' modules validés</span>' +
      '<span class="status-chip">' + stats.xp + ' XP parents</span>' +
      '<span class="status-chip">Remontée auto vers le super-hub active</span>'
    ) : (
      '<span class="status-chip">10 modules progressifs</span>' +
      '<span class="status-chip">5 piliers adultes</span>' +
      '<span class="status-chip">Progression automatique sans code</span>'
    );

    document.getElementById('resume-btn').disabled = !player || !next;
    document.getElementById('resume-btn').textContent = !player ? 'Ouvrir une session pour commencer' : (next ? ('Ouvrir le prochain module : ' + next.id) : 'Parcours complet');
    document.getElementById('reset-btn').disabled = !player;
    document.getElementById('logout-btn').disabled = !player;
    document.getElementById('download-save-btn').disabled = !player;

    var recent = recentPlayers();
    document.getElementById('recent-wrap').classList.toggle('hidden', recent.length === 0);
    document.getElementById('recent-list').innerHTML = recent.map(function(entry){
      return '<button type="button" class="recent-chip" data-player="' + entry.replace(/"/g, '&quot;') + '">' + entry + '</button>';
    }).join('');

    var input = document.getElementById('player-input');
    if(input){
      input.value = player || '';
    }
  }

  function renderSidebar(){
    var player = currentPlayer();
    var stats = computeStats(player);
    var percent = stats.total ? Math.round((stats.completed / stats.total) * 100) : 0;
    var next = player ? nextModule(player) : null;
    var ring = document.getElementById('progress-ring');
    ring.style.setProperty('--deg', (percent * 3.6) + 'deg');
    ring.innerHTML = '<div><strong>' + percent + '%</strong><span>progression</span></div>';
    document.getElementById('sidebar-title').textContent = player ? player : 'Session non ouverte';
    document.getElementById('metric-grid').innerHTML =
      '<div class="metric"><strong>' + stats.completed + '/' + stats.total + '</strong><span>modules terminés</span></div>' +
      '<div class="metric"><strong>' + stats.xp + '</strong><span>XP cumulés</span></div>' +
      '<div class="metric"><strong>' + (next ? next.id : 'FIN') + '</strong><span>prochaine étape</span></div>' +
      '<div class="metric"><strong>' + (player ? 'Auto' : 'En attente') + '</strong><span>sync super-hub</span></div>';

    document.getElementById('signal-list').innerHTML =
      '<div class="signal-item"><strong>Le corps parle souvent avant le récit</strong><br>Absences, ventre noué, fatigue, perte d’appétit, isolement ou téléphone devenu source d’angoisse méritent une trace factuelle.</div>' +
      '<div class="signal-item"><strong>La honte peut ressembler à de la colère</strong><br>Minimisation, porte claquée, phrases sèches ou retrait brutal ne disent pas toujours qu’il n’y a rien ; ils disent parfois que c’est trop.</div>' +
      '<div class="signal-item"><strong>Le numérique laisse des traces utiles</strong><br>Captures, URL, pseudo, date, horaire, plateforme : ce sont ces détails qui permettent de faire retirer et traiter.</div>' +
      '<div class="signal-item"><strong>Un enfant protégé peut rester sans horizon</strong><br>Quand tout projet disparaît, il faut parfois rouvrir d’abord un lieu supportable, un rythme, une visite ou un mini-stage.</div>';

    document.getElementById('quick-list').innerHTML =
      '<div class="quick-item"><strong>Établissement</strong><br>Premier réflexe : parler à un adulte de l’établissement pour enclencher la protection et le suivi.</div>' +
      '<div class="quick-item"><strong>3018</strong><br>Numéro de référence pour le harcèlement et les violences numériques : preuves, signalements, suppression de contenus, accompagnement.</div>' +
      '<div class="quick-item"><strong>PsyEN / MDA / CMP</strong><br>Quand la souffrance, l’orientation ou le repli persistent, les relais autour de l’adolescent deviennent importants.</div>' +
      '<div class="quick-item"><strong>119</strong><br>Si la situation relève d’un danger grave pour un mineur, ne restez pas seul avec le doute.</div>';
  }

  function renderPillars(){
    var player = currentPlayer();
    var done = completedSet(player);
    var html = '';
    PILLARS.forEach(function(pillar, pillarIndex){
      var modules = MODULES.filter(function(module){ return module.pillar === pillar.id; });
      html += '<article class="pillar-card fade-up" style="animation-delay:' + (pillarIndex * 80) + 'ms">';
      html += '<div class="pillar-head">';
      html += '<div class="pillar-icon" style="color:' + pillar.accent + ';border-color:' + pillar.accent + '40">' + pillar.icon + '</div>';
      html += '<div><h3 class="pillar-title">' + pillar.title + '</h3><p class="pillar-copy">' + pillar.description + '</p></div>';
      html += '<div class="pill-tag">' + pillar.tag + '</div>';
      html += '</div><div class="module-list">';
      modules.forEach(function(module){
        var completed = done.has(module.id);
        var unlocked = isUnlocked(module, done);
        var statusClass = completed ? 'done' : (unlocked ? 'next' : 'locked');
        var statusText = completed ? 'Validé' : (unlocked ? 'Accessible' : 'Verrouillé');
        html += '<div class="module-row ' + (completed ? 'done' : (unlocked ? 'unlocked' : 'locked')) + '">';
        html += '<div class="module-main"><div class="module-top">';
        html += '<h4 class="module-title">' + module.title + '</h4>';
        html += '<span class="module-meta">' + module.id + ' · ' + module.duration + ' · +' + module.xp + ' XP</span>';
        html += '</div><p class="module-summary">' + module.summary + '</p>';
        html += '<div class="tag-list">' + module.tags.map(function(tag){ return '<span class="tag">' + tag + '</span>'; }).join('') + '</div></div>';
        html += '<div class="module-actions"><div class="module-status ' + statusClass + '">' + statusText + '</div>';
        html += '<button type="button" class="primary-btn module-btn" ' + (unlocked || completed ? 'data-open="' + module.id + '"' : 'disabled') + '>' + (completed ? 'Revoir le module' : (unlocked ? 'Ouvrir le module' : 'Terminer le précédent')) + '</button>';
        html += '</div></div>';
      });
      html += '</div></article>';
    });
    document.getElementById('pillar-grid').innerHTML = html;
  }

  function renderPath(){
    var player = currentPlayer();
    var done = completedSet(player);
    var next = nextModule(player);
    document.getElementById('path-grid').innerHTML = MODULES.map(function(module, idx){
      var state = done.has(module.id) ? 'Validé' : (next && next.id === module.id ? 'À venir maintenant' : 'Plus tard');
      return '<div class="path-card">' +
        '<span class="resource-kicker">Étape ' + (idx + 1) + '</span>' +
        '<strong>' + module.title + '</strong>' +
        '<p>' + module.summary + '</p>' +
        '<p class="footer-note">Statut : ' + state + '</p>' +
      '</div>';
    }).join('');
  }

  function bindInteractions(){
    document.getElementById('session-form').addEventListener('submit', handleSessionSubmit);
    document.getElementById('resume-btn').addEventListener('click', function(){
      var next = nextModule(currentPlayer());
      if(next){ launchModule(next.id); }
    });
    document.getElementById('reset-btn').addEventListener('click', resetCurrentProgress);
    document.getElementById('logout-btn').addEventListener('click', logoutCurrentPlayer);
    document.getElementById('download-save-btn').addEventListener('click', downloadCurrentSave);
    document.getElementById('upload-save-btn').addEventListener('click', function(){
      document.getElementById('save-file-input').click();
    });
    document.getElementById('save-file-input').addEventListener('change', handleSaveFileSelection);

    document.addEventListener('click', function(evt){
      var openId = evt.target.getAttribute('data-open');
      if(openId){ launchModule(openId); }
      var player = evt.target.getAttribute('data-player');
      if(player){ setCurrentPlayer(player); }
    });
  }

  function render(){
    syncCurrentPlayerState();
    syncBridgeForCurrentPlayer();
    renderHero();
    renderSidebar();
    renderPillars();
    renderPath();
  }

  document.addEventListener('DOMContentLoaded', function(){
    bindInteractions();
    restorePlayerState(currentPlayer());
    render();
  });

  window.addEventListener('storage', function(evt){
    if(!evt.key){ return; }
    if(evt.key === PLAYER_KEY || evt.key === CURRENT_PLAYER_KEY || evt.key.indexOf(PLAYER_STATE_PREFIX) === 0 || evt.key.indexOf(CERT_PREFIX) === 0){
      restorePlayerState(currentPlayer());
      render();
    }
  });
})();
