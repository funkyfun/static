System.register([], function(_export, _context) { return { execute: function () {
System.register("chunks:///_virtual/cjs-loader.mjs", [], function (exports) {
  'use strict';

  return {
    execute: function () {
      var CjsLoader = /*#__PURE__*/function () {
        function CjsLoader() {
          this._registry = {};
          this._moduleCache = {};
        }
        /**
         * Defines a CommonJS module.
         * @param id Module ID.
         * @param factory The factory.
         * @param resolveMap An object or a function returning object which records the module specifier resolve result.
         * The later is called as "deferred resolve map" and would be invocated right before CommonJS code execution.
         */


        var _proto = CjsLoader.prototype;

        _proto.define = function define(id, factory, resolveMap) {
          this._registry[id] = {
            factory: factory,
            resolveMap: resolveMap
          };
        }
        /**
         * Requires a CommonJS module.
         * @param id Module ID.
         * @returns The module's `module.exports`.
         */
        ;

        _proto.require = function require(id) {
          return this._require(id);
        };

        _proto.throwInvalidWrapper = function throwInvalidWrapper(requestTarget, from) {
          throw new Error("Module '" + requestTarget + "' imported from '" + from + "' is expected be an ESM-wrapped CommonJS module but it doesn't.");
        };

        _proto._require = function _require(id, parent) {
          var cachedModule = this._moduleCache[id];

          if (cachedModule) {
            return cachedModule.exports;
          }

          var module = {
            id: id,
            exports: {}
          };
          this._moduleCache[id] = module;

          this._tryModuleLoad(module, id);

          return module.exports;
        };

        _proto._resolve = function _resolve(specifier, parent) {
          return this._resolveFromInfos(specifier, parent) || this._throwUnresolved(specifier, parent);
        };

        _proto._resolveFromInfos = function _resolveFromInfos(specifier, parent) {
          var _cjsInfos$parent$reso, _cjsInfos$parent;

          if (specifier in cjsInfos) {
            return specifier;
          }

          if (!parent) {
            return;
          }

          return (_cjsInfos$parent$reso = (_cjsInfos$parent = cjsInfos[parent]) == null ? void 0 : _cjsInfos$parent.resolveCache[specifier]) != null ? _cjsInfos$parent$reso : undefined;
        };

        _proto._tryModuleLoad = function _tryModuleLoad(module, id) {
          var threw = true;

          try {
            this._load(module, id);

            threw = false;
          } finally {
            if (threw) {
              delete this._moduleCache[id];
            }
          }
        };

        _proto._load = function _load(module, id) {
          var _this$_loadWrapper = this._loadWrapper(id),
              factory = _this$_loadWrapper.factory,
              resolveMap = _this$_loadWrapper.resolveMap;

          var vendorRequire = this._createRequire(module);

          var require = resolveMap ? this._createRequireWithResolveMap(typeof resolveMap === 'function' ? resolveMap() : resolveMap, vendorRequire) : vendorRequire;

          factory(module.exports, require, module);
        };

        _proto._loadWrapper = function _loadWrapper(id) {
          if (id in this._registry) {
            return this._registry[id];
          } else {
            return this._loadExternalWrapper(id);
          }
        };

        _proto._loadExternalWrapper = function _loadExternalWrapper(id) {
          return {
            factory: function factory(exports) {
              var path;

              try {
                path = URL.fileURLToPath(id);
              } catch (err) {
                throw new Error(id + " is not a valid file URL");
              }

              var extern = require(path);

              Object.assign(exports, extern);
            }
          };
        };

        _proto._createRequire = function _createRequire(module) {
          var _this = this;

          return function (specifier) {
            return _this._require(specifier, module);
          };
        };

        _proto._createRequireWithResolveMap = function _createRequireWithResolveMap(requireMap, originalRequire) {
          return function (specifier) {
            var resolved = requireMap[specifier];

            if (resolved) {
              return originalRequire(resolved);
            } else {
              throw new Error('Unresolved specifier ' + specifier);
            }
          };
        };

        _proto._throwUnresolved = function _throwUnresolved(specifier, parentUrl) {
          throw new Error("Unable to resolve " + specifier + " from " + parent + ".");
        };

        return CjsLoader;
      }();

      var loader = exports('default', new CjsLoader());
    }
  };
});

System.register("chunks:///_virtual/rollupPluginModLoBabelHelpers.js", [], function (exports) {
  'use strict';

  return {
    execute: function () {
      exports({
        applyDecoratedDescriptor: _applyDecoratedDescriptor,
        assertThisInitialized: _assertThisInitialized,
        createClass: _createClass,
        inheritsLoose: _inheritsLoose,
        initializerDefineProperty: _initializerDefineProperty,
        setPrototypeOf: _setPrototypeOf
      });

      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        Object.defineProperty(Constructor, "prototype", {
          writable: false
        });
        return Constructor;
      }

      function _inheritsLoose(subClass, superClass) {
        subClass.prototype = Object.create(superClass.prototype);
        subClass.prototype.constructor = subClass;

        _setPrototypeOf(subClass, superClass);
      }

      function _setPrototypeOf(o, p) {
        _setPrototypeOf = exports('setPrototypeOf', Object.setPrototypeOf || function _setPrototypeOf(o, p) {
          o.__proto__ = p;
          return o;
        });
        return _setPrototypeOf(o, p);
      }

      function _assertThisInitialized(self) {
        if (self === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return self;
      }

      function _initializerDefineProperty(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
          enumerable: descriptor.enumerable,
          configurable: descriptor.configurable,
          writable: descriptor.writable,
          value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
      }

      function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object.keys(descriptor).forEach(function (key) {
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
          Object.defineProperty(target, property, desc);
          desc = null;
        }

        return desc;
      }
    }
  };
});

System.register("chunks:///_virtual/test.js", ['./cjs-loader.mjs'], function (exports, module) {
  'use strict';

  var loader;
  return {
    setters: [function (module) {
      loader = module.default;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);

      loader.define(__cjsMetaURL, function (exports$1, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        System.register("chunks:///_virtual/CameraController.ts", ["cc", "./_rollupPluginModLoBabelHelpers.js", "./Global.ts", "./Poster.ts", "./MathUtil.ts", "./ClickItem.ts"], function (t) {
          var e, i, o, a, n, r, s, l, h, u, g, m, d, _, p, y, v, f, C;

          return {
            setters: [function (t) {
              e = t.cclegacy, i = t._decorator, o = t.Node, a = t.Quat, n = t.geometry, r = t.Camera, s = t.view, l = t.Vec2, h = t.tween, t.PhysicsSystem, u = t.Component;
            }, function (t) {
              g = t.applyDecoratedDescriptor, m = t.inheritsLoose, d = t.defineProperty, _ = t.assertThisInitialized, p = t.initializerDefineProperty, y = t.createClass;
            }, function (t) {
              v = t.Global;
            }, function (t) {
              f = t.Poster;
            }, function (t) {
              C = t.MathUtil;
            }, function (t) {
              t.ClickItem;
            }],
            execute: function execute() {
              var b, S, k, T, H, M, E, L, R, P, I, z, O;

              e._RF.push({}, "c3880uk/t9PSrlcWcMpg7Lz", "CameraController", void 0);

              var A = i.ccclass,
                  B = i.property,
                  D = v.isLandscape ? 16 : 18;
              t("CameraController", (b = A("CameraController"), S = B(o), k = B(o), T = B(o), H = B(f), M = B(o), b((R = g((L = function (t) {
                function e() {
                  for (var e, i = arguments.length, o = new Array(i), r = 0; r < i; r++) {
                    o[r] = arguments[r];
                  }

                  return e = t.call.apply(t, [this].concat(o)) || this, d(_(e), "lastCameraTransform", void 0), p(_(e), "clickItems", R, _(e)), d(_(e), "_quat", new a()), p(_(e), "camera", P, _(e)), p(_(e), "hall", I, _(e)), p(_(e), "poster", z, _(e)), p(_(e), "guide", O, _(e)), d(_(e), "_touchCount", 0), d(_(e), "_mayBeClick", void 0), d(_(e), "_tweenGuanXing", void 0), d(_(e), "_lastHallDegree", 0), d(_(e), "_hallManualRotSpeed", 0), d(_(e), "hallSelfRotSpeed", 1.2), d(_(e), "_ray", new n.geometry.Ray()), d(_(e), "_lastHighlightClickItem", void 0), e;
                }

                m(e, t);
                var i = e.prototype;
                return i.onLoad = function () {
                  t.Global.cameraController = this, this.camera.getComponent(r).fov = this.initFov, this.guide.active = ture, this.poster.options = {
                    cameraController: this
                  }, this.camera.position.z = t.Global.isLandscape ? 10 : 7.5, this.camera.position = this.camera.position, this.node.on(o.EventType.TOUCH_START, this._onTouchStart, this), this.node.on(o.EventType.TOUCH_MOVE, this._onTouchMove, this), this.node.on(o.EventType.TOUCH_END, this._onTouchEnd, this), this.node.on(o.EventType.TOUCH_CANCEL, this._onTouchEnd, this), this.node.on(o.EventType.MOUSE_WHEEL, this._onMouseWheel, this), this.node.on(o.EventType.MOUSE_MOVE, this._onMouseMove, this);
                }, i.start = function () {
                  var t = document.getElementById("loading");
                  t && t.remove();
                }, i.onEnable = function () {
                  this._clearHover(), this._touchCount = 0, this._mayBeClick = void 0, this.hallSelfRotSpeed = 0;
                }, i._onTouchStart = function (t) {
                  ++this._touchCount, this.hallSelfRotSpeed = 0, this._tweenGuanXing && (this._tweenGuanXing.stop(), this._tweenGuanXing = void 0), 1 === this._touchCount ? (this._mayBeClick = {
                    startTime: Date.now(),
                    startLocation: t.getLocation()
                  }, this._clearHover(), this._raycast(t.getLocation()), this._lastHighlightClickItem ? v.audios.source.playOneShot(v.audios.click) : "pointer" !== v.cursor.style && (v.cursor.style = "grabbing")) : this._mayBeClick = void 0;
                }, i._onTouchMove = function (t) {
                  var e = t.getAllTouches();

                  if (this._clearHover(), t.Global.cursor.style = "grabbing", 1 === e.length) {
                    this.guide && (this.guide.removeFromParent(), this.guide = void 0);
                    var i = t.touch.getDelta(),
                        o = this.camera.eulerAngles,
                        n = s.view.getVisibleSize();
                    this.camera.setRotationFromEuler(MathUtil.limit(o.x - i.y / n.height * (n.width > n.height ? 100 : 40), -30, 30), 0, 0);
                    var r = i.x / n.width * (n.width > n.height ? -100 : -40);
                    r *= (this.camera.position.z - -6) / (D - -6) * .5 + .5, this.hall.rotate(Quat.fromEuler(this._quat, 0, r, 0));
                  }

                  if (2 === e.length) {
                    var h = l.distance(e[0].getPreviousLocation(), e[1].getPreviousLocation()),
                        c = l.distance(e[0].getLocation(), e[1].getLocation());

                    this._forwardMoveCamera((c - h) / s.getVisibleSize().width * -5);
                  }
                }, i._onTouchEnd = function (t) {
                  if (--this._touchCount, 0 === this._touchCount && (this._clearHover(), this.hallSelfRotSpeed = this._hallManualRotSpeed, this._tweenGuanXing = h(this).to(1, {
                    hallSelfRotSpeed: 0
                  }, {
                    easing: "cubicOut"
                  }).start(), v.cursor.style = "grab"), this._mayBeClick && Date.now() - this._mayBeClick.startTime < 150 && l.distance(t.touch.getLocation(), this._mayBeClick.startLocation) < 10) {
                    var e = this._raycast(t.touch.getLocation());

                    e && (this.node.active = !1, this.lastCameraTransform = {
                      worldPosition: this.camera.worldPosition.clone(),
                      worldRotation: this.camera.worldRotation.clone()
                    }, e.click(), v.cursor.style = "default", this.clickItems.active = !1);
                  }
                }, i._onMouseWheel = function (t) {
                  this._forwardMoveCamera(t.getScrollY() / -300);
                }, i._forwardMoveCamera = function (t) {
                  var e = this.camera.worldPosition.y,
                      i = this.camera.position;
                  i.z = C.limit(i.z + t, -6, D), this.camera.position = i, this.camera.worldPosition.y = e, this.camera.worldPosition = this.camera.worldPosition;
                }, i.update = function (t) {
                  var e = t * this.hallSelfRotSpeed;
                  e *= (this.camera.position.z - -6) / (D - -6) * .8 + .2, this.hall.eulerAngles.y += e, this.hall.eulerAngles = this.hall.eulerAngles, this._hallManualRotSpeed = (this.hall.eulerAngles.y - this._lastHallDegree) / t, this._lastHallDegree = this.hall.eulerAngles.y;
                }, i._onMouseMove = function (t) {
                  this._clearHover(), this._raycast(t.getLocation());
                }, i._clearHover = function () {
                  this._lastHighlightClickItem && (this._lastHighlightClickItem.hoverOut(), this._lastHighlightClickItem = void 0), "grabbing" !== v.cursor.style && (v.cursor.style = "grab");
                }, i._raycast = function (t) {
                  if (this.camera.getComponent(r).screenPointToRay(t.x, t.y, this._ray), PhysicsSystem.instance.raycastClosest(this._ray, 1)) {
                    var e = PhysicsSystem.instance.raycastClosestResult;
                    return this._lastHighlightClickItem = e.collider.getComponent(ClickItem), this._lastHighlightClickItem.hover(), "grabbing" !== v.cursor.style && (v.cursor.style = "pointer"), this._lastHighlightClickItem;
                  }

                  return this._clearHover(), this._lastHighlightClickItem = void 0;
                }, i.onBtnLang = function () {
                  window.location.href = window.location.href.indexOf("/en/") > -1 ? "../cn/index.html" : "../en/index.html";
                }, y(e, [{
                  key: "initFov",
                  get: function get() {
                    return v.isLandscape ? 55 : 65;
                  }
                }]), e;
              }(u)).prototype, "clickItems", [S], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
              }), P = g(L.prototype, "camera", [k], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function initializer() {
                  return null;
                }
              }), I = g(L.prototype, "hall", [T], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
              }), z = g(L.prototype, "poster", [H], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function initializer() {
                  return null;
                }
              }), O = g(L.prototype, "guide", [M], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: null
              }), E = L)) || E));

              e._RF.pop();
            }
          };
        });
        System.register("chunks:///_virtual/index.ts", ["cc", "./index.mjs"], function () {
          var e;
          return {
            setters: [function (t) {
              e = t.cclegacy;
            }, null],
            execute: function execute() {
              e._RF.push({}, "cfeddjdfihG+IJigpwC/LsA", "index", void 0), e._RF.pop();
            }
          };
        }); // #endregion ORIGINAL CODE

        _cjsExports = exports('default', module.exports);
      }, {});
    }
  };
});

System.register("chunks:///_virtual/test.mjs_cjs=&original=.js", ['./test.js', './cjs-loader.mjs'], function (exports, module) {
  'use strict';

  var __cjsMetaURL, loader;

  return {
    setters: [function (module) {
      __cjsMetaURL = module.__cjsMetaURL;
      var _setter = {};
      _setter.__cjsMetaURL = module.__cjsMetaURL;
      _setter.default = module.default;
      exports(_setter);
    }, function (module) {
      loader = module.default;
    }],
    execute: function () {
      // I am the facade module who provides access to the CommonJS module './test.js'~
      if (!__cjsMetaURL) {
        loader.throwInvalidWrapper('./test.js', module.meta.url);
      }

      loader.require(__cjsMetaURL);
    }
  };
});

} }; });