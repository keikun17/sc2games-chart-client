export default {
  updateGrid: (region, player_id, name) => {
    return {
      type: "UpdateGrid",
      region: region, player_id: player_id, name:name
    }
  }
}
