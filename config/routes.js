exports.routes = function (map) {

  map.get('/', 'homepage#show');

  // Partials
  map.get('partials/:partial', 'partials#show');

  // Admin
  map.get('admin*', 'admin#index');
  map.resources('status', { path: 'api/1/status' });

  // Fixtures
  map.get('fixture/reset', 'fixture#reset');
  map.get('fixture/status/applicationVersion', 'fixture#statusApplicationVersion');
  map.get('fixture/status/commitHash', 'fixture#statusCommitHash');
};
