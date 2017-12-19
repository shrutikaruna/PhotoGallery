define('app',['exports', 'aurelia-auth'], function (exports, _aureliaAuth) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      this.router = router;
      config.addPipelineStep('authorize', _aureliaAuth.AuthorizeStep);
      config.map([{
        route: ['', 'home'],
        moduleId: './modules/home',
        name: 'Home'
      }, {
        route: 'list',
        moduleId: './modules/list',
        name: 'List',
        auth: true
      }]);
    };

    return App;
  }();
});
define('auth-config',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var authConfig = {
        baseUrl: "http://localhost:5000/api",
        loginUrl: '/users/login',
        tokenName: 'token',
        authHeader: 'Authorization',
        authToken: '',
        logoutRedirect: '#/home'
    };

    exports.default = authConfig;
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment', 'regenerator-runtime', './auth-config'], function (exports, _environment, _regeneratorRuntime, _authConfig) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  var _regeneratorRuntime2 = _interopRequireDefault(_regeneratorRuntime);

  var _authConfig2 = _interopRequireDefault(_authConfig);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  window.regeneratorRuntime = _regeneratorRuntime2.default;

  function configure(aurelia) {
    aurelia.use.standardConfiguration().plugin('aurelia-auth', function (baseConfig) {
      baseConfig.configure(_authConfig2.default);
    }).feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('modules/home',['exports', 'aurelia-framework', 'aurelia-router', '../resources/data/users', 'aurelia-auth'], function (exports, _aureliaFramework, _aureliaRouter, _users, _aureliaAuth) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Home = undefined;

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Home = exports.Home = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _users.Users, _aureliaAuth.AuthService), _dec(_class = function () {
    function Home(router, users, auth) {
      _classCallCheck(this, Home);

      this.router = router;
      this.auth = auth;
      this.loginError = '';
      this.users = users;
      this.message = 'Home';
      this.showLogin = true;
    }

    Home.prototype.showRegister = function showRegister() {
      this.user = {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      };
      this.registerError = "";

      this.showLogin = false;
    };

    Home.prototype.save = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var serverResponse;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log(this.user);
                _context.next = 3;
                return this.users.save(this.user);

              case 3:
                serverResponse = _context.sent;

                if (!serverResponse.error) {
                  this.showLogin = true;
                } else {
                  this.registerError = "There was a problem registering the user.";
                }

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function save() {
        return _ref.apply(this, arguments);
      }

      return save;
    }();

    Home.prototype.login = function login() {
      var _this = this;

      return this.auth.login(this.email, this.password).then(function (response) {
        sessionStorage.setItem("user", JSON.stringify(response.user));
        _this.loginError = "";
        _this.router.navigate('list');
      }).catch(function (error) {
        console.log(error);
        _this.loginError = "Invalid credentials.";
      });
    };

    return Home;
  }()) || _class);
});
define('modules/list',['exports', 'aurelia-framework', 'aurelia-router', '../resources/data/mypics', '../resources/data/gallery', 'aurelia-auth'], function (exports, _aureliaFramework, _aureliaRouter, _mypics, _gallery, _aureliaAuth) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.List = undefined;

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var List = exports.List = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _mypics.MyPics, _aureliaAuth.AuthService, _gallery.Mygallery), _dec(_class = function () {
    function List(router, mypics, auth, mygalleries) {
      _classCallCheck(this, List);

      this.mypics = mypics;
      this.router = router;
      this.mygalleries = mygalleries;
      this.message = 'List';
      this.auth = auth;
      this.user = JSON.parse(sessionStorage.getItem('user'));
      this.showing = "mypicList";
    }

    List.prototype.activate = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.mypics.getUserMypics(this.user._id);

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function activate() {
        return _ref.apply(this, arguments);
      }

      return activate;
    }();

    List.prototype.createMypic = function createMypic() {
      this.mypicObj = {
        mypic: "",
        dateCreated: new Date(),
        description: "",
        userId: this.user._id

      };
      this.showing = 'mypicForm';
    };

    List.prototype.createPhotos = function createPhotos() {
      this.mypicObj = {
        userId: this.user._id,
        Id: this.selectedgallery

      };
      this.showing = 'photoForm';
    };

    List.prototype.editMypic = function editMypic(mypic) {
      this.mypicObj = mypic;
      this.showing = 'mypicForm';
    };

    List.prototype.editPhotos = function editPhotos(mypic) {
      this.mypicObj = mypic;
      this.showing = 'photoForm';
    };

    List.prototype.deleteMypic = function deleteMypic(mypic) {
      this.mypics.deleteMypic(mypic._id);
    };

    List.prototype.deletePhotos = function deletePhotos(mypic) {
      this.mygalleries.deleteMypic(mypic._id);
    };

    List.prototype.back = function back() {
      this.showing = "mypicList";
    };

    List.prototype.backPhotos = function backPhotos() {
      this.showing = "photoList";
    };

    List.prototype.saveMypic = function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var response, mypicId;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this.mypicObj) {
                  _context2.next = 14;
                  break;
                }

                _context2.next = 3;
                return this.mypics.save(this.mypicObj);

              case 3:
                response = _context2.sent;

                if (!response.error) {
                  _context2.next = 8;
                  break;
                }

                alert("There was an error creating the Mypic");
                _context2.next = 13;
                break;

              case 8:
                mypicId = response._id;

                if (!(this.filesToUpload && this.filesToUpload.length)) {
                  _context2.next = 13;
                  break;
                }

                _context2.next = 12;
                return this.mypics.uploadFile(this.filesToUpload, this.user._id, mypicId);

              case 12:
                this.filesToUpload = [];

              case 13:
                this.showing = "mypicList";

              case 14:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function saveMypic() {
        return _ref2.apply(this, arguments);
      }

      return saveMypic;
    }();

    List.prototype.savePhotos = function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
        var response, mypicId;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this.mypicObj) {
                  _context3.next = 14;
                  break;
                }

                _context3.next = 3;
                return this.mygalleries.save(this.mypicObj);

              case 3:
                response = _context3.sent;

                if (!response.error) {
                  _context3.next = 8;
                  break;
                }

                alert("There was an error creating the Mypic");
                _context3.next = 13;
                break;

              case 8:
                mypicId = response._id;

                if (!(this.filesToUpload && this.filesToUpload.length)) {
                  _context3.next = 13;
                  break;
                }

                _context3.next = 12;
                return this.mygalleries.uploadFile(this.filesToUpload, this.user._id, mypicId);

              case 12:
                this.filesToUpload = [];

              case 13:
                this.showing = "photoList";

              case 14:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function savePhotos() {
        return _ref3.apply(this, arguments);
      }

      return savePhotos;
    }();

    List.prototype.showPhotos = function () {
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(mypic) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.selectedgallery = mypic._id;
                _context4.next = 3;
                return this.mygalleries.getPhotos(mypic._id);

              case 3:
                this.showing = "photoList";

              case 4:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function showPhotos(_x) {
        return _ref4.apply(this, arguments);
      }

      return showPhotos;
    }();

    List.prototype.changeFiles = function changeFiles() {
      this.filesToUpload = new Array();
      this.filesToUpload.push(this.files[0]);
    };

    List.prototype.removeFile = function removeFile(index) {
      this.filesToUpload.splice(index, 1);
    };

    List.prototype.logout = function logout() {
      sessionStorage.removeItem('user');
      this.auth.logout();
    };

    return List;
  }()) || _class);
});
define('resources/index',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {
    config.globalResources(['./value-converters/date-format', './value-converters/completed', './elements/flatpickr']);
  }
});
define('resources/data/data-services',['exports', 'aurelia-framework', 'aurelia-fetch-client'], function (exports, _aureliaFramework, _aureliaFetchClient) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.DataServices = undefined;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var DataServices = exports.DataServices = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = function () {
		function DataServices(http) {
			var _this = this;

			_classCallCheck(this, DataServices);

			this.httpClient = http;
			this.BASE_URL = "http://localhost:5000/api/";
			this.httpClient.configure(function (config) {
				config.withBaseUrl(_this.BASE_URL).withDefaults({
					credentials: 'same-origin',
					headers: {
						'Accept': 'application/json',
						'X-Requested-With': 'Fetch'
					}
				}).withInterceptor({
					request: function request(_request) {
						var authHeader = 'Bearer ' + localStorage.getItem('aurelia_token');
						_request.headers.append('Authorization', authHeader);
						console.log('Requesting ' + _request.method + ' ' + _request.url);
						return _request;
					},
					response: function response(_response) {
						console.log('Received ' + _response.status + ' ' + _response.url);
						return _response;
					}
				});
			});
		}

		DataServices.prototype.get = function get(url) {
			return this.httpClient.fetch(url).then(function (response) {
				return response.json();
			}).then(function (data) {
				return data;
			}).catch(function (error) {
				return error;
			});
		};

		DataServices.prototype.post = function post(content, url) {
			return this.httpClient.fetch(url, {
				method: 'post',
				body: (0, _aureliaFetchClient.json)(content)
			}).then(function (response) {
				return response.json();
			}).then(function (object) {
				return object;
			}).catch(function (error) {
				return error;
			});
		};

		DataServices.prototype.put = function put(content, url) {
			return this.httpClient.fetch(url, {
				method: 'put',
				body: (0, _aureliaFetchClient.json)(content)
			}).then(function (response) {
				return response.json();
			}).then(function (object) {
				return object;
			}).catch(function (error) {
				return error;
			});
		};

		DataServices.prototype.delete = function _delete(url) {
			return this.httpClient.fetch(url, {
				method: 'delete'
			}).then(function (response) {
				return response.json();
			}).then(function (object) {
				return object;
			}).catch(function (error) {
				return error;
			});
		};

		DataServices.prototype.uploadFiles = function uploadFiles(files, url) {
			return this.httpClient.fetch(url, {
				method: 'post',
				body: files
			}).then(function (response) {
				return response.json();
			}).then(function (object) {
				return object;
			}).catch(function (error) {
				return error;
			});
		};

		return DataServices;
	}()) || _class);
});
define('resources/data/gallery',['exports', 'aurelia-framework', './data-services'], function (exports, _aureliaFramework, _dataServices) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Mygallery = undefined;

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Mygallery = exports.Mygallery = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class = function () {
        function Mygallery(data) {
            _classCallCheck(this, Mygallery);

            this.data = data;
            this.MYGALLERY_SERVICE = 'Galleries';
            this.mygalleryArray = [];
        }

        Mygallery.prototype.getPhotos = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(id) {
                var response;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.data.get(this.MYGALLERY_SERVICE + "/" + id);

                            case 2:
                                response = _context.sent;

                                if (!response.error && !response.message) {
                                    this.mygalleryArray = response;
                                }

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getPhotos(_x) {
                return _ref.apply(this, arguments);
            }

            return getPhotos;
        }();

        Mygallery.prototype.getUserMygallery = function () {
            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(id) {
                var response;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return this.data.get(this.MYGALLERY_SERVICE + "/user/" + id);

                            case 2:
                                response = _context2.sent;

                                if (!response.error && !response.message) {
                                    this.mygalleryArray = response;
                                }

                            case 4:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getUserMygallery(_x2) {
                return _ref2.apply(this, arguments);
            }

            return getUserMygallery;
        }();

        Mygallery.prototype.save = function () {
            var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(mygallery) {
                var serverResponse, _serverResponse;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                if (!mygallery) {
                                    _context3.next = 14;
                                    break;
                                }

                                if (mygallery._id) {
                                    _context3.next = 9;
                                    break;
                                }

                                _context3.next = 4;
                                return this.data.post(mygallery, this.MYGALLERY_SERVICE);

                            case 4:
                                serverResponse = _context3.sent;

                                if (!serverResponse.error) {
                                    this.mygalleryArray.push(serverResponse);
                                }
                                return _context3.abrupt('return', serverResponse);

                            case 9:
                                _context3.next = 11;
                                return this.data.put(mygallery, this.MYGALLERY_SERVICE + "/" + mygallery._id);

                            case 11:
                                _serverResponse = _context3.sent;

                                if (!_serverResponse.error) {}
                                return _context3.abrupt('return', _serverResponse);

                            case 14:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function save(_x3) {
                return _ref3.apply(this, arguments);
            }

            return save;
        }();

        Mygallery.prototype.deleteMypic = function () {
            var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(id) {
                var serverResponse, i;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.next = 2;
                                return this.data.delete(this.MYGALLERY_SERVICE + "/" + id);

                            case 2:
                                serverResponse = _context4.sent;

                                if (!serverResponse.error) {
                                    for (i = 0; i < this.mygalleryArray.length; i++) {
                                        if (this.mygalleryArray[i]._id === id) {
                                            this.mygalleryArray.splice(i, 1);
                                        }
                                    }
                                }

                            case 4:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function deleteMypic(_x4) {
                return _ref4.apply(this, arguments);
            }

            return deleteMypic;
        }();

        Mygallery.prototype.uploadFile = function () {
            var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(files, userId, mygalleryId) {
                var formData, serverResponse;
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                formData = new FormData();

                                files.forEach(function (item, index) {
                                    formData.append("file" + index, item);
                                });

                                _context5.next = 4;
                                return this.data.uploadFiles(formData, this.MYGALLERY_SERVICE + "/upload/" + userId + "/" + mygalleryId);

                            case 4:
                                serverResponse = _context5.sent;
                                return _context5.abrupt('return', serverResponse);

                            case 6:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function uploadFile(_x5, _x6, _x7) {
                return _ref5.apply(this, arguments);
            }

            return uploadFile;
        }();

        return Mygallery;
    }()) || _class);
});
define('resources/data/mypics',['exports', 'aurelia-framework', './data-services'], function (exports, _aureliaFramework, _dataServices) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.MyPics = undefined;

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var MyPics = exports.MyPics = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class = function () {
        function MyPics(data) {
            _classCallCheck(this, MyPics);

            this.data = data;
            this.MYPIC_SERVICE = 'mypics';
            this.mypicsArray = [];
        }

        MyPics.prototype.getUserMypics = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(id) {
                var response;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.data.get(this.MYPIC_SERVICE + "/user/" + id);

                            case 2:
                                response = _context.sent;

                                if (!response.error && !response.message) {
                                    this.mypicsArray = response;
                                }

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getUserMypics(_x) {
                return _ref.apply(this, arguments);
            }

            return getUserMypics;
        }();

        MyPics.prototype.save = function () {
            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(mypic) {
                var serverResponse, _serverResponse;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                console.log(mypic);

                                if (!mypic) {
                                    _context2.next = 15;
                                    break;
                                }

                                if (mypic._id) {
                                    _context2.next = 10;
                                    break;
                                }

                                _context2.next = 5;
                                return this.data.post(mypic, this.MYPIC_SERVICE);

                            case 5:
                                serverResponse = _context2.sent;

                                if (!serverResponse.error) {
                                    this.mypicsArray.push(serverResponse);
                                }
                                return _context2.abrupt('return', serverResponse);

                            case 10:
                                _context2.next = 12;
                                return this.data.put(mypic, this.MYPIC_SERVICE + "/" + mypic._id);

                            case 12:
                                _serverResponse = _context2.sent;

                                if (!_serverResponse.error) {}
                                return _context2.abrupt('return', _serverResponse);

                            case 15:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function save(_x2) {
                return _ref2.apply(this, arguments);
            }

            return save;
        }();

        MyPics.prototype.deleteMypic = function () {
            var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(id) {
                var serverResponse, i;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return this.data.delete(this.MYPIC_SERVICE + "/" + id);

                            case 2:
                                serverResponse = _context3.sent;

                                if (!serverResponse.error) {
                                    for (i = 0; i < this.mypicsArray.length; i++) {
                                        if (this.mypicsArray[i]._id === id) {
                                            this.mypicsArray.splice(i, 1);
                                        }
                                    }
                                }

                            case 4:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function deleteMypic(_x3) {
                return _ref3.apply(this, arguments);
            }

            return deleteMypic;
        }();

        MyPics.prototype.uploadFile = function () {
            var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(files, userId, mypicId) {
                var formData, serverResponse;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                formData = new FormData();

                                files.forEach(function (item, index) {
                                    formData.append("file" + index, item);
                                });

                                _context4.next = 4;
                                return this.data.uploadFiles(formData, this.MYPIC_SERVICE + "/upload/" + userId + "/" + mypicId);

                            case 4:
                                serverResponse = _context4.sent;
                                return _context4.abrupt('return', serverResponse);

                            case 6:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function uploadFile(_x4, _x5, _x6) {
                return _ref4.apply(this, arguments);
            }

            return uploadFile;
        }();

        return MyPics;
    }()) || _class);
});
define('resources/data/users',['exports', 'aurelia-framework', './data-services'], function (exports, _aureliaFramework, _dataServices) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Users = undefined;

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Users = exports.Users = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class = function () {
        function Users(data) {
            _classCallCheck(this, Users);

            this.data = data;

            this.USER_SERVICE = 'users';
        }

        Users.prototype.save = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(user) {
                var serverResponse;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!user) {
                                    _context.next = 5;
                                    break;
                                }

                                _context.next = 3;
                                return this.data.post(user, this.USER_SERVICE);

                            case 3:
                                serverResponse = _context.sent;
                                return _context.abrupt('return', serverResponse);

                            case 5:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function save(_x) {
                return _ref.apply(this, arguments);
            }

            return save;
        }();

        return Users;
    }()) || _class);
});
define('resources/elements/flatpickr',['exports', 'aurelia-framework', 'flatpickr'], function (exports, _aureliaFramework, _flatpickr) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.FlatPickerCustomElement = undefined;

    var _flatpickr2 = _interopRequireDefault(_flatpickr);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor;

    var FlatPickerCustomElement = exports.FlatPickerCustomElement = (_dec = (0, _aureliaFramework.inject)(Element), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function FlatPickerCustomElement(element) {
            _classCallCheck(this, FlatPickerCustomElement);

            _initDefineProp(this, 'value', _descriptor, this);

            this.element = element;
        }

        FlatPickerCustomElement.prototype.bind = function bind() {
            var defaultConfig = {
                altInput: true,
                altFormat: "F j, Y",
                wrap: true
            };
            this._config = Object.assign({}, defaultConfig);
            this._config.onChange = this._config.onMonthChange = this._config.onYearChange = this.onChange.bind(this);
        };

        FlatPickerCustomElement.prototype.attached = function attached() {
            this.flatpickr = new _flatpickr2.default(this.element.querySelector('.aurelia-flatpickr'), this._config);
        };

        FlatPickerCustomElement.prototype.onChange = function onChange(selectedDates, dateStr, instance) {
            this.value = selectedDates[0];
        };

        FlatPickerCustomElement.prototype.valueChanged = function valueChanged() {
            if (!this.flatpickr) {
                return;
            }
            if (this.value === this.flatpickr.selectedDates[0]) {
                return;
            }
            var newDate = this.value ? this.value : undefined;
            this.flatpickr.setDate(newDate);
        };

        return FlatPickerCustomElement;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'value', [_dec2], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('resources/value-converters/completed',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var CompletedValueConverter = exports.CompletedValueConverter = function () {
    function CompletedValueConverter() {
      _classCallCheck(this, CompletedValueConverter);
    }

    CompletedValueConverter.prototype.toView = function toView(array, value) {
      if (!value) {
        return array.filter(function (item) {
          return !item.completed;
        });
      } else {
        return array;
      }
    };

    return CompletedValueConverter;
  }();
});
define('resources/value-converters/date-format',['exports', 'moment'], function (exports, _moment) {
   'use strict';

   Object.defineProperty(exports, "__esModule", {
      value: true
   });
   exports.DateFormatValueConverter = undefined;

   var _moment2 = _interopRequireDefault(_moment);

   function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
         default: obj
      };
   }

   function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
         throw new TypeError("Cannot call a class as a function");
      }
   }

   var DateFormatValueConverter = exports.DateFormatValueConverter = function () {
      function DateFormatValueConverter() {
         _classCallCheck(this, DateFormatValueConverter);
      }

      DateFormatValueConverter.prototype.toView = function toView(value) {
         var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Do MMM YYYY';

         if (value === undefined || value === null) {
            return;
         }

         return (0, _moment2.default)(value).format(format);
      };

      return DateFormatValueConverter;
   }();
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><router-view></router-view></template>"; });
define('text!modules/home.html', ['module'], function(module) { module.exports = "<template>   <compose show.bind=\"showLogin\" view=\"./components/login.html\"></compose>    <compose show.bind=\"!showLogin\" view=\"./components/register.html\"></compose></template>"; });
define('text!resources/css/styles.css', ['module'], function(module) { module.exports = "@import url('https://fonts.googleapis.com/css?family=Open+Sans:300');\r\n\r\n* {\r\n  margin: 0;\r\n  padding: 0;\r\n  box-sizing: border-box;\r\n}\r\n\r\nbody {\r\n  font: 14px/1 'Open Sans', sans-serif;\r\n  color: #555;\r\n  background: #e5e5e5;\r\n}\r\n\r\n.gallery {\r\n  width: 640px;\r\n  margin: 0 auto;\r\n  padding: 5px;\r\n  background: #fff;\r\n  box-shadow: 0 1px 2px rgba(0,0,0,.3);\r\n}\r\n\r\n.gallery > div {\r\n  position: relative;\r\n  float: left;\r\n  padding: 5px;\r\n}\r\n\r\n\r\n.table-striped > thead > tr > th {\r\n  position: relative;\r\n  padding: 5px;\r\n  background-color: rgb(236, 10, 78);\r\n  font:  20px/1 'Open Sans', sans-serif;\r\n  text-align: center;\r\n\r\n}\r\n\r\n.gallery > div > img {\r\n  display: block;\r\n  width: 200px;\r\n  transition: .1s transform;\r\n  transform: translateZ(0); /* hack */\r\n}\r\n\r\n.gallery > div:hover {\r\n  z-index: 1;\r\n}\r\n\r\n.gallery > div:hover > img {\r\n  transform: scale(1.7,1.7);\r\n  transition: .3s transform;\r\n}\r\n\r\n.cf:before, .cf:after {\r\n  display: table;\r\n  content: \"\";\r\n  line-height: 0;\r\n}\r\n\r\n.cf:after {\r\n  clear: both;\r\n}\r\n\r\nh1 {\r\n  margin: 40px 0;\r\n  font-size: 30px;\r\n  font-weight: 300;\r\n  text-align: center;\r\n}"; });
define('text!modules/list.html', ['module'], function(module) { module.exports = "<template> <compose show.bind=\"showing == 'mypicList'\" view=\"./components/mypicList.html\"></compose><compose show.bind=\"showing == 'mypicForm'\" view=\"./components/mypicForm.html\"></compose>  <compose show.bind=\"showing == 'photoList'\" view=\"./components/photoList.html\"></compose> <compose show.bind=\"showing == 'photoForm'\" view=\"./components/photoForm.html\"></compose> </template>"; });
define('text!modules/components/login.html', ['module'], function(module) { module.exports = "<template><script src=\"http://code.angularjs.org/snapshot/angular.js\"></script><h1 style=\"font-family:times new roman;color:#1c2224\"><center><b><i>Photo Gallery!!</i></b></center></h1><br><br><table align=\"center\" width=\"40%\" style=\"border-radius:8px;height:300px;vertical-align:middle;background-color:#2d48e6;top:50%;left:50%\"><div id=\"errorMsg\" innerhtml.bind=\"loginError\"></div><tr><td colspan=\"3\">&nbsp;</td></tr><tr><td width=\"5%\">&nbsp;</td><td><div class=\"input-group input-group-lg\"><div class=\"input-group-addon\"><span class=\"fa fa-lg fa-envelope\"></div><input value.bind=\"email\" type=\"email\" autofocus class=\"form-control\" id=\"email\" required placeholder=\"Email\"></div></td><td width=\"5%\">&nbsp;</td></tr><tr><td>&nbsp;</td><td><div class=\"input-group input-group-lg\"><div class=\"input-group-addon\"><span class=\"fa fa-lg fa-key\"></div><input value.bind=\"password\" type=\"password\" class=\"form-control\" id=\"password\" required placeholder=\"Password\"></div></td><td>&nbsp;</td></tr><tr><td colspan=\"3\">&nbsp;</td></tr><tr><td colspan=\"3\" align=\"center\"><button click.trigger=\"login()\" style=\"font-family:Merienda;border-radius:6px;width:160px;height:40px;border:solid 2px;font-size:15px\"><b><i>Login</i></b></button> &nbsp;&nbsp; <button click.trigger=\"showRegister()\" style=\"font-family:Merienda;border-radius:6px;width:160px;height:40px;border:2px solid\"><b><i>Register</i></b></button></td></tr><tr><td colspan=\"3\">&nbsp;</td></tr></table></template>"; });
define('text!modules/components/mypicForm.html', ['module'], function(module) { module.exports = "<template style=\"background-color:#eec97a\"><form><div item-width=\"60%\"><span><i click.trigger=\"back()\" class=\"fa fa-arrow-left fa-lg fa-4x\" aria-hidden=\"true\"></i></span><h1 style=\"font-family:palatino;color:#1c182b;text-align:center\"><b><i>Add Gallery Folder</i></b></h1></div><table align=\"center\" width=\"60%\" style=\"border-radius:8px;height:300px;vertical-align:middle;background-color:#f8bd7a;top:50%;left:50%\"><tr><td colspan=\"3\">&nbsp;</td></tr><tr><td width=\"5%\">&nbsp;</td><td><label for=\"mypicInput\" style=\"color:#110f14;font-size:140%;font-family:palatino\"><b><i>Gallery Name*</i></b></label><input value.bind=\"mypicObj.mypic\" type=\"text\" class=\"form-control\" id=\"mypicInput\" aria-describedby=\"mypicHelp\" placeholder=\"Enter Gallery Name\" width=\"80px\"></td><td>&nbsp;</td></tr><tr><td colspan=\"3\">&nbsp;</td></tr><tr><td width=\"5%\">&nbsp;</td><td><label for=\"mypicInput\" style=\"color:#110f14;font-size:140%;font-family:palatino\"><b><i>Description*</i></b></label><input value.bind=\"mypicObj.description\" type=\"text\" class=\"form-control\" id=\"mypicInput\" aria-describedby=\"mypicHelp\" placeholder=\"Enter Description\" width=\"80px\"></td><td>&nbsp;</td></tr><tr><td colspan=\"3\">&nbsp;</td></tr><tr><td>&nbsp;</td><td><label for=\"dateCreatedInput\" style=\"color:#000;font-size:140%;font-family:palatino\"><b><i>Date Created*</i></b></label><flat-picker value.bind=\"mypicObj.dateCreated\"></flat-picker></td><td>&nbsp;</td></tr><tr><td colspan=\"3\">&nbsp;</td></tr><tr><td align=\"center\" colspan=\"3\"><button click.trigger=\"saveMypic()\" style=\"font-family:palatino;border-radius:6px;width:160px;height:40px;border:solid 2px;font-size:140%\"><b><i>Save</i></b></button>    </td></tr><tr><td colspan=\"3\">&nbsp;</td></tr></table></form></template>"; });
define('text!modules/components/mypicList.html', ['module'], function(module) { module.exports = "<template style=\"background-color:#1f2935\"><form><h1 style=\"font-family:Times New Roman;color:#4415f0;text-align:center\"><b><i>Gallery List !!</i></b></h1>   <table align=\"center\" width=\"60%\" style=\"top:50%;left:50%\"><tr><td><button type=\"button\" click.trigger=\"createMypic()\" style=\"font-family:palatino;border-radius:6px;width:160px;height:40px;border:solid 2px;font-size:140%\"><b><i>Add Folder</i></b></button></td><td></td><td align=\"right\"><button type=\"button\" click.trigger=\"logout()\" style=\"font-family:palatino;border-radius:6px;width:160px;height:40px;border:solid 2px;font-size:140%\"><b><i>Logout</i></b>&nbsp;&nbsp;</button></td></tr></table><br><br><div show.bind=\"mypics.mypicsArray.length\"><table align=\"center\" width=\"60%\" style=\"border-radius:8px;vertical-align:middle;background-color:#9dc6f5;top:50%;left:50%\"><tr><th bgcolor=\"#C70039\" style=\"text-align:center;color:#f0ecec;font-size:160%;font-family:palatino\"><i>Gallery</i></th><th bgcolor=\"#C70039\" style=\"text-align:center;color:#f8f7f7;font-size:160%;font-family:palatino\"><i>Date Created</i></th><th bgcolor=\"#C70039\" style=\"text-align:center;color:#fcfafa;font-size:160%;font-family:palatino\"><i>Edit</i></th></tr><tbody><tr repeat.for=\"mypic of mypics.mypicsArray\"><td click.trigger=\"showPhotos(mypic)\" style=\"text-align:center;font-family:palatino;font-size:140%\">${mypic.mypic}</td><td style=\"text-align:center;font-family:palatino;font-size:140%\"><i>${mypic.dateCreated | dateFormat}</i></td><td style=\"text-align:center\"><i click.trigger=\"editMypic(mypic)\" class=\"fa fa-pencil rightMargin\" aria-hidden=\"true\"></i>&nbsp;&nbsp; <i click.trigger=\"deleteMypic(mypic)\" class=\"fa fa-trash rightMargin\" aria-hidden=\"true\"></i></td></tr></tbody></table><div show.bind=\"!mypics.mypicsArray.length\"><br><br><h2 style=\"text-align:center;color:#000;font-family:palatino\"><i>No Folders!!! Would you like to add some ??</i></h2></div></div></form></template>"; });
define('text!modules/components/photoForm.html', ['module'], function(module) { module.exports = "<template><div item-width=\"60%\"><span><i click.trigger=\"back()\" class=\"fa fa-arrow-left fa-lg fa-4x\" aria-hidden=\"true\"></i></span><h1 style=\"font-family:palatino;color:#1c182b;text-align:center\"><b><i>Add Photo !!</i></b></h1></div><form><table align=\"center\" width=\"40%\" style=\"border-radius:8px;height:300px;vertical-align:middle;background-color:#f792f7;top:50%;left:50%\"><tr><td align=\"center\"><br><br><label class=\"btn btn-primary\" style=\"color:#0e0d13;font-size:160%;font-family:palatino\">Click To Browse Photo <input type=\"file\" style=\"display:none\" change.delegate=\"changeFiles()\" files.bind=\"files\"></label><br><br><ul><li repeat.for=\"file of filesToUpload\" class=\"list-group-item\"> ${file.name}<span click.delegate=\"removeFile($index)\" class=\"pull-right\"><i class=\"fa fa-trash\" aria-hidden=\"true\">&nbsp;&nbsp;&nbsp;</i></span></li></ul><br><br><br><button click.trigger=\"savePhotos()\" style=\"font-family:palatino;border-radius:6px;width:160px;height:40px;border:solid 2px;font-size:140%\"><b><i>Save Photo</i></b></button><br><br></td></tr></table></form></template>"; });
define('text!modules/components/photoList.html', ['module'], function(module) { module.exports = "<template><form><link href=\"../../resources/css/styles.css\" type=\"stylesheet\"><div item-width=\"60%\"><span><i click.trigger=\"back()\" class=\"fa fa-arrow-left fa-lg fa-4x\" aria-hidden=\"true\"></i></span><h1 style=\"font-family:palatino;color:#1c182b;text-align:center\"><b><i>Photos!!</i></b></h1></div><div class=\"container\"><div class=\"card topMargin\"><div class=\"row\"><span class=\"col\"><span class=\"rightMargin pull-right\"><button type=\"button\" click.trigger=\"logout()\" style=\"font-family:palatino;border-radius:6px;width:160px;height:40px;border:solid 2px;font-size:140%\"><b><i>Logout</i></b></button></span>  <span class=\"leftMargin pull-left\"><button type=\"button\" click.trigger=\"createPhotos()\" style=\"font-family:palatino;border-radius:6px;width:160px;height:40px;border:solid 2px;font-size:140%\"><b><i>Add Photo</i></b></button></span></span></div><div show.bind=\"mygalleries.mygalleryArray.length\"><table class=\"table\"><tbody><tr repeat.for=\"mygallery of mygalleries.mygalleryArray \" align=\"center\"><td><a href=\"http://localhost:5000/uploads/${user._id}/${mygallery.file.fileName}\" target=\"_blank\"><img src=\"http://localhost:5000/uploads/${user._id}/${mygallery.file.fileName}\" style=\"width:Auto;height:150px\"></a><br></td><td><i click.trigger=\"editPhotos(mygallery)\" class=\"fa fa-pencil rightMargin\" aria-hidden=\"true\" align=\"right\"></i> <i click.trigger=\"deletePhotos(mygallery)\" class=\"fa fa-trash rightMargin\" aria-hidden=\"true\" align=\"right\"></i></td></tr></tbody></table></div><div show.bind=\"!mygalleries.mygalleryArray.length\"><br><br><h2 style=\"text-align:center;color:#000;font-family:Times New Roman\"><b>No Photos!! Would you add some</b></h2></div></div></div></form></template>"; });
define('text!modules/components/register.html', ['module'], function(module) { module.exports = "<template><h1 style=\"font-family:times new roman;color:#ff7f00;margin-left:540px\"><b>Registration!!</b></h1><form class=\"col-lg-4 col-lg-offset-4\" id=\"RegistrationForm\"><table align=\"center\" width=\"100%\" style=\"border-radius:8px;height:300px;vertical-align:middle;background-color:#9dc6f5;top:50%;left:50%\"><tr><td colspan=\"3\">&nbsp;</td></tr><tr><td width=\"5%\">&nbsp;</td><td><div innerhtml.bind=\"registerError\"></div><div class=\"form-group\"><label for=\"InputFirstName\" style=\"color:#000;font-family:times new roman;font-size:160%\"><b>First Name:</b></label><input type=\"text\" class=\"form-control\" id=\"InputFirstName\" aria-describedby=\"firstNameHelp\" placeholder=\"\" value.bind=\"user.firstName\" style=\"font-family:times new roman;font-size:100%\"></div><div class=\"form-group\"><label for=\"InputLastName\" style=\"color:#000;font-family:times new roman;font-size:160%\"><b>Last Name:</b></label><input type=\"text\" class=\"form-control\" id=\"InputLastName\" aria-describedby=\"lastNameHelp\" placeholder=\"\" value.bind=\"user.lastName\" style=\"font-family:times new roman;font-size:100%\"></div><div class=\"form-group\"><label for=\"InputEmail\" style=\"color:#000;font-family:times new roman;font-size:160%\"><b>Email:</b></label><input type=\"email\" class=\"form-control\" id=\"InputEmail\" aria-describedby=\"emailHelp\" placeholder=\"\" value.bind=\"user.email\" style=\"font-family:times new roman;font-size:100%\"></div><div class=\"form-group\"><label for=\"password\" style=\"color:#000;font-family:times new roman;font-size:160%\"><b>Password:</b></label><input value.bind=\"user.password\" type=\"password\" class=\"form-control\" id=\"password\" placeholder=\"\" style=\"font-family:times new roman;font-size:100%\"></div></td><td width=\"5%\">&nbsp;</td></tr><tr><td colspan=\"3\" align=\"center\"><button click.delegate=\"save()\" style=\"font-family:palatino;font-size:140%;border-radius:6px;width:160px;height:40px;border:2px solid\"><b><i>Save</i></b></button></td></tr><tr><td colspan=\"3\">&nbsp;</td></tr></table></form></template>"; });
define('text!resources/elements/flatpickr.html', ['module'], function(module) { module.exports = "<template>    <require from=\"flatpickr/flatpickr.css\"></require>    <div class=\"input-group aurelia-flatpickr\">        <input type=\"text\" class=\"aurelia-flatpickr form-control flatPicker\" data-input>     </div></template>"; });
//# sourceMappingURL=app-bundle.js.map