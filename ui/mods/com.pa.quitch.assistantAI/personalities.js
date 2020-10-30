var aiAssistantLoaded;

function aiAssistant() {
  if (aiAssistantLoaded) {
    return;
  }

  aiAssistantLoaded = true;

  api.debug.log("Loading AI Assistant personalities");

  var aiPersonalities = model.aiPersonalities();

  var newPersonalities = {
    aiAssistant: {
      ai_path: "/pa/ai_assistant",
      display_name: "!LOC:AI Assistant",
      adv_eco_mod_alone: 0,
      adv_eco_mod: 1,
      energy_demand_check: 0.8,
      energy_drain_check: 0.65,
      metal_demand_check: 0.85,
      metal_drain_check: 0.54,
      min_advanced_fabbers: 1,
      min_basic_fabbers: 3,
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
