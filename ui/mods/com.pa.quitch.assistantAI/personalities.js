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
      go_for_the_kill: true,
      micro_type: 2,
      neural_data_mod: 1,
      priority_scout_metal_spots: true,
    },
    aiaFabber: {
      ai_path: "/pa/aia_fabber",
      display_name: "!LOC:AIA Construction",
      adv_eco_mod_alone: 0,
      adv_eco_mod: 1,
      energy_demand_check: 0.8,
      energy_drain_check: 0.65,
      metal_demand_check: 0.85,
      metal_drain_check: 0.54,
      min_advanced_fabbers: 1,
      min_basic_fabbers: 3,
    },
    aiaFactory: {
      ai_path: "/pa/aia_factory",
      display_name: "!LOC:AIA Factory",
      adv_eco_mod_alone: 0,
      adv_eco_mod: 1,
      energy_demand_check: 0.8,
      energy_drain_check: 0.65,
      metal_demand_check: 0.85,
      metal_drain_check: 0.54,
      min_advanced_fabbers: 1,
      min_basic_fabbers: 3,
      personality_tags: ["queller"],
    },
    aiaArmyFactory: {
      ai_path: "/pa/aia_armyfac",
      display_name: "!LOC:AIA General",
      adv_eco_mod_alone: 0,
      adv_eco_mod: 1,
      energy_demand_check: 0.8,
      energy_drain_check: 0.65,
      go_for_the_kill: true,
      metal_demand_check: 0.85,
      metal_drain_check: 0.54,
      micro_type: 2,
      min_advanced_fabbers: 1,
      min_basic_fabbers: 3,
      neural_data_mod: 1,
      personality_tags: ["queller"],
      priority_scout_metal_spots: true,
    },
    aiaFabberFactory: {
      ai_path: "/pa/aia_fabfac",
      display_name: "!LOC:AIA Production",
      adv_eco_mod_alone: 0,
      adv_eco_mod: 1,
      energy_demand_check: 0.8,
      energy_drain_check: 0.65,
      metal_demand_check: 0.85,
      metal_drain_check: 0.54,
      min_advanced_fabbers: 1,
      min_basic_fabbers: 3,
      personality_tags: ["queller"],
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
        "!LOC:by Quitch. For single-player only using a local server. If you haven't read the setup instructions then prepare to be confused."
      )
    );
  });
}

try {
  aiAssistant();
} catch (e) {
  console.error(e);
}
