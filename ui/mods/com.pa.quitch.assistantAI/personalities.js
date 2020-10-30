var aiAssistantLoaded;

function aiAssistant() {
  if (aiAssistantLoaded) {
    return;
  }

  aiAssistantLoaded = true;

  api.debug.log("Loading AI Assistant personalities");

  var aiPersonalities = model.aiPersonalities();

  var newPersonalities = {
    aiaArmy: {
      ai_path: "/pa/aia_army",
      display_name: "!LOC:AIA Captain",
      micro_type: 2,
      go_for_the_kill: true,
      priority_scout_metal_spots: true,
      neural_data_mod: 1,
    },
    aiaFabber: {
      ai_path: "/pa/aia_fabber",
      display_name: "!LOC:AIA Construction",
      metal_drain_check: 0.54,
      energy_drain_check: 0.65,
      metal_demand_check: 0.85,
      energy_demand_check: 0.8,
      adv_eco_mod: 1,
      adv_eco_mod_alone: 0,
      min_basic_fabbers: 3,
      min_advanced_fabbers: 1,
    },
    aiaEco: {
      ai_path: "/pa/aia_eco",
      display_name: "!LOC:AIA Economist",
      metal_drain_check: 0.54,
      energy_drain_check: 0.65,
      metal_demand_check: 0.85,
      energy_demand_check: 0.8,
      adv_eco_mod: 1,
      adv_eco_mod_alone: 0,
    },
    aiaFactory: {
      ai_path: "/pa/aia_factory",
      display_name: "!LOC:AIA Factory",
      metal_drain_check: 0.54,
      energy_drain_check: 0.65,
      metal_demand_check: 0.85,
      energy_demand_check: 0.8,
      adv_eco_mod: 1,
      adv_eco_mod_alone: 0,
      min_basic_fabbers: 3,
      min_advanced_fabbers: 1,
    },
    aiaArmyFactory: {
      ai_path: "/pa/aia_armyfac",
      display_name: "!LOC:AIA General",
      metal_drain_check: 0.54,
      energy_drain_check: 0.65,
      metal_demand_check: 0.85,
      energy_demand_check: 0.8,
      adv_eco_mod: 1,
      adv_eco_mod_alone: 0,
      min_basic_fabbers: 3,
      min_advanced_fabbers: 1,
    },
    aiaFabberFactory: {
      ai_path: "/pa/aia_fabfac",
      display_name: "!LOC:AIA Production",
      metal_drain_check: 0.54,
      energy_drain_check: 0.65,
      metal_demand_check: 0.85,
      energy_demand_check: 0.8,
      adv_eco_mod: 1,
      adv_eco_mod_alone: 0,
      min_basic_fabbers: 3,
      min_advanced_fabbers: 1,
    },
  };

  var baseline = aiPersonalities.Absurd;

  newPersonalities = _.mapValues(newPersonalities, function (
    personality,
    name
  ) {
    var result = _.assign(_.clone(baseline), personality);
    result["name"] = name;
    return result;
  });

  _.assign(aiPersonalities, newPersonalities);

  model.aiPersonalities.valueHasMutated();

  _.defer(function () {
    model.localChatMessage(
      loc("!LOC:AI Assistant"),
      loc(
        "!LOC:by Quitch. For single-player only using a local server. Setup a shared army and add one AI Assistant to it. If you cannot share an army with the AI then you didn't follow the setup instructions."
      )
    );
  });
}

try {
  aiAssistant();
} catch (e) {
  console.error(e);
}
