System.register("chunks:///_virtual/cameraCtrl.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './MathUtil.ts', './clickItem.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, Node, Quat, geometry, Camera, view, Vec2, tween, PhysicsSystem, Component, limit, clickItem;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Quat = module.Quat;
      geometry = module.geometry;
      Camera = module.Camera;
      view = module.view;
      Vec2 = module.Vec2;
      tween = module.tween;
      PhysicsSystem = module.PhysicsSystem;
      Component = module.Component;
    }, function (module) {
      limit = module.limit;
    }, function (module) {
      clickItem = module.clickItem;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;

      cclegacy._RF.push({}, "cb8faNJDNNCh5oUTgGDEo9b", "cameraCtrl", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          type = _decorator.type;

      function isLandscape() {
        var size = view.getVisibleSize();
        return size.width > size.height;
      }

      var clickTweenTime = 0.3;
      var cameraCtrl = exports('cameraCtrl', (_dec = ccclass("cameraCtrl"), _dec2 = type(Node), _dec3 = type(Node), _dec4 = type(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(cameraCtrl, _Component);

        function cameraCtrl() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "camera", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "boxNode", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "uiNode", _descriptor3, _assertThisInitialized(_this));

          _this._touchCount = 0;
          _this._mayBeClick = void 0;
          _this.hallSelfRotSpeed = 1.2;
          _this._quat = new Quat();
          _this._hallManualRotSpeed = 0;
          _this._lastHallDegree = 0;
          _this._lastHighlightClickItem = null;
          _this._tweenGuanXing = void 0;
          _this._ray = new geometry.Ray();
          _this.lastCameraTransform = void 0;
          _this._touchEnanble = true;
          return _this;
        }

        var _proto = cameraCtrl.prototype;

        _proto.onLoad = function onLoad() {
          this.camera.getComponent(Camera).fov = this.initFov; // const position = this.camera.position;
          // position.set(isLandscape() ? 10 : 7.5, position.y, position.z);
          // this.camera.position = this.camera.position;

          this.node.on(Node.EventType.TOUCH_START, this._onTouchStart, this);
          this.node.on(Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
          this.node.on(Node.EventType.TOUCH_END, this._onTouchEnd, this);
          this.node.on(Node.EventType.TOUCH_CANCEL, this._onTouchEnd, this);
          this.node.on(Node.EventType.MOUSE_WHEEL, this._onMouseWheel, this);
        };

        _proto.start = function start() {};

        _proto.onEnable = function onEnable() {
          // this._clearHover(),
          this._touchCount = 0;
          this._mayBeClick = void 0;
          this.hallSelfRotSpeed = 0;
        };

        _proto.update = function update(deltaTime) {
          var e = deltaTime * this.hallSelfRotSpeed;
          e *= (this.camera.position.z - -6) / (this.D - -6) * 0.8 + 0.2;
          var boxNode = this.boxNode;
          var boxEulerAngles = boxNode.eulerAngles;
          boxEulerAngles.set(boxEulerAngles.x, boxEulerAngles.y + e, boxEulerAngles.z);
          boxNode.eulerAngles = boxEulerAngles;
          this._hallManualRotSpeed = (boxNode.eulerAngles.y - this._lastHallDegree) / deltaTime;
          this._lastHallDegree = boxNode.eulerAngles.y;
        };

        _proto._onTouchStart = function _onTouchStart(e) {
          if (!this._touchEnanble) return;
          ++this._touchCount;
          this.hallSelfRotSpeed = 0;

          if (this._tweenGuanXing) {
            this._tweenGuanXing.stop();

            this._tweenGuanXing = void 0;
          }

          if (1 === this._touchCount) {
            this._mayBeClick = {
              startTime: Date.now(),
              startLocation: e.getLocation()
            };
          } else {
            this._mayBeClick = void 0;
          }
        };

        _proto._onTouchMove = function _onTouchMove(e) {
          if (!this._touchEnanble) return;
          var touchs = e.getAllTouches();

          if (1 === touchs.length) {
            var touchDelta = e.touch.getDelta();
            var eulerAngles = this.camera.eulerAngles;
            var visibleSize = view.getVisibleSize();
            this.camera.setRotationFromEuler(limit(eulerAngles.x - touchDelta.y / visibleSize.height * (visibleSize.width > visibleSize.height ? 100 : 40), -30, 30), 0, 0);
            var r = touchDelta.x / visibleSize.width * (visibleSize.width > visibleSize.height ? -100 : -40);
            r *= (this.camera.position.z - -6) / (this.D - -6) * 0.5 + 0.5;
            this.boxNode.rotate(Quat.fromEuler(this._quat, 0, r, 0));
          }

          if (2 === touchs.length) {
            var _visibleSize = view.getVisibleSize();

            var h = Vec2.distance(touchs[0].getPreviousLocation(), touchs[1].getPreviousLocation());
            var c = Vec2.distance(touchs[0].getLocation(), touchs[1].getLocation());

            this._forwardMoveCamera((c - h) / _visibleSize.width * -5);
          }
        };

        _proto._onTouchEnd = function _onTouchEnd(t) {
          if (!this._touchEnanble) return;
          --this._touchCount;

          if (0 === this._touchCount) {
            this.hallSelfRotSpeed = this._hallManualRotSpeed;
            this._tweenGuanXing = tween(this).to(1, {
              hallSelfRotSpeed: 0
            }, {
              easing: "cubicOut"
            }).start();
          }

          if (0 === this._touchCount && this._mayBeClick && Date.now() - this._mayBeClick.startTime < 150 && Vec2.distance(t.touch.getLocation(), this._mayBeClick.startLocation) < 10) {
            var e = this._raycast(t.touch.getLocation());

            if (e) {
              // this.node.active = false;
              this.lastCameraTransform = {
                worldPosition: this.camera.worldPosition.clone(),
                worldRotation: this.camera.worldRotation.clone()
              };
              this._touchEnanble = false;
              this.uiNode.active = true;
              e.click();
            }
          }
        };

        _proto._onMouseWheel = function _onMouseWheel(e) {
          this._forwardMoveCamera(e.getScrollY() / -300);
        };

        _proto._raycast = function _raycast(t) {
          this.camera.getComponent(Camera).screenPointToRay(t.x, t.y, this._ray);

          if (PhysicsSystem.instance.raycastClosest(this._ray, 1)) {
            var e = PhysicsSystem.instance.raycastClosestResult;
            this._lastHighlightClickItem = e.collider.getComponent(clickItem);
            return this._lastHighlightClickItem;
          }

          this._lastHighlightClickItem = null;
          return null;
        };

        _proto._forwardMoveCamera = function _forwardMoveCamera(t) {
          var worldPosition = this.camera.worldPosition;
          var worldPositionY = worldPosition.y;
          var position = this.camera.position;
          var z = limit(position.z + t, -6, this.D);
          position.set(position.x, position.y, z);
          this.camera.position = position;
          worldPosition.set(worldPosition.x, worldPositionY, worldPosition.z);
          this.camera.worldPosition = this.camera.worldPosition;
        };

        _proto.onBtnClick = function onBtnClick() {
          var _this2 = this;

          tween(this.camera.getComponent(Camera)).to(clickTweenTime, {
            fov: this.initFov
          }, {
            easing: "linear"
          }).start();
          tween(this.camera).to(clickTweenTime, {
            worldPosition: this.lastCameraTransform.worldPosition
          }, {
            easing: "linear"
          }).call(function () {
            // this.node.active = true;
            // this.clickItems.active = true;
            _this2._touchEnanble = true;
            _this2.uiNode.active = false;
          }).start();
          var t = this.camera.worldRotation.clone();
          var r = this.lastCameraTransform.worldRotation;
          tween({}).to(clickTweenTime, {}, {
            easing: "linear",
            onUpdate: function onUpdate(e, i) {
              console.log("ratio", i), _this2.camera.worldRotation = Quat.slerp(_this2.camera.worldRotation, t, r, i);
            }
          }).start();
        };

        _createClass(cameraCtrl, [{
          key: "initFov",
          get: function get() {
            return isLandscape() ? 55 : 65;
          }
        }, {
          key: "D",
          get: function get() {
            return isLandscape() ? 16 : 18;
          }
        }]);

        return cameraCtrl;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "camera", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "boxNode", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "uiNode", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/clickItem.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, BoxCollider, director, Camera, tween, Quat, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      BoxCollider = module.BoxCollider;
      director = module.director;
      Camera = module.Camera;
      tween = module.tween;
      Quat = module.Quat;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "c09d9tm4odPFIzVjgE3SwrZ", "clickItem", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var clickItem = exports('clickItem', (_dec = ccclass("clickItem"), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(clickItem, _Component);

        function clickItem() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.camera = void 0;
          _this._selfCamera = void 0;
          return _this;
        }

        var _proto = clickItem.prototype;

        _proto.onLoad = function onLoad() {
          this.getComponent(BoxCollider).setGroup(1);
          this.camera = director.getScene().getChildByName("Main Camera").getComponent(Camera);
          this._selfCamera = this.node.getChildByName("Camera").getComponent(Camera);
        };

        _proto.start = function start() {};

        _proto.update = function update(deltaTime) {};

        _proto.click = function click() {
          var _this2 = this;

          console.log("======");
          tween(this.camera).to(0.3, {
            fov: this._selfCamera.fov
          }, {
            easing: "linear"
          }).start();
          tween(this.camera.node).to(0.3, {
            worldPosition: this._selfCamera.node.worldPosition
          }, {
            easing: "linear"
          }).start();
          var i = this.camera.node.worldRotation.clone();

          var e = this._selfCamera.node.worldRotation.clone();

          tween({}).to(0.3, {}, {
            easing: "linear",
            onUpdate: function onUpdate(o, n) {
              console.log("ratio", n), _this2.camera.node.worldRotation = Quat.slerp(_this2.camera.node.worldRotation, i, e, n);
            }
          }).start();
        };

        return clickItem;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/faceAniCtrl.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _createClass, cclegacy, _decorator, CCFloat, MeshRenderer, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      CCFloat = module.CCFloat;
      MeshRenderer = module.MeshRenderer;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2;

      cclegacy._RF.push({}, "311168WOg9F9LCwB+S+nbHv", "faceAniCtrl", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var faceAniCtrl = exports('faceAniCtrl', (_dec = ccclass('faceAniCtrl'), _dec2 = property({
        type: [CCFloat],
        range: [0, 1, 0.1],
        slide: true
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(faceAniCtrl, _Component);

        function faceAniCtrl() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this._weightsControl = [];
          _this._modelComp = null;
          _this._totalTargets = 0;
          _this.playing = true;
          _this.directionFlag = 0;
          _this.lastFrameTime = 0;
          _this.perFrameTime = 1 / 60;
          return _this;
        }

        var _proto = faceAniCtrl.prototype;

        _proto.setWeights = function setWeights(weights) {
          if (weights.length === 0) {
            return;
          }

          for (var iSubMeshMorph = 0; iSubMeshMorph < this._morph.subMeshMorphs.length; ++iSubMeshMorph) {
            if (this._morph.subMeshMorphs[iSubMeshMorph]) {
              this._modelComp.setWeights(weights, iSubMeshMorph);
            }
          }
        };

        _proto.start = function start() {
          this._modelComp = this.node.getComponent(MeshRenderer);

          if (!this._modelComp) {
            return;
          }

          var mesh = this._modelComp.mesh;

          if (!mesh) {
            return;
          }

          this._morph = mesh.struct.morph;

          if (!this._morph) {
            return;
          }

          if (this._morph.subMeshMorphs.length === 0) {
            // TODO submeshcount是0
            console.warn('submesh count is 0');
            return;
          }

          var firstNonNullSubMeshMorph = this._morph.subMeshMorphs.find(function (subMeshMorph) {
            return !!subMeshMorph;
          });

          if (!firstNonNullSubMeshMorph) {
            // TODO 任何 submesh 都没有Morph
            console.warn("all submesh don't have morph");
            return;
          }

          if (!this._morph.subMeshMorphs.every(function (subMeshMorph) {
            return !subMeshMorph || subMeshMorph.targets.length === firstNonNullSubMeshMorph.targets.length;
          })) {
            // TODO 每个 submesh 的target数量不一样
            console.warn("not all submesh count are the same");
          }

          console.log(JSON.stringify(this._morph.targetNames));
          var subMeshMorph = this._morph.subMeshMorphs[0];
          var nTargets = subMeshMorph ? subMeshMorph.targets.length : 0;
          this._totalTargets = nTargets;
          var weightsControl = new Array(nTargets).fill(0); // 笑容形变

          weightsControl[1] = 0.3;
          this.weightsControl = weightsControl;
        };

        _proto.onSliderChanged = function onSliderChanged(target, customEventData) {
          {
            console.log(target, customEventData);
          }
          var index = Number.parseInt(customEventData);
          this.weightsControl[index] = target.progress;
          this.weightsControl = this.weightsControl;
        };

        _proto.update = function update(dt) {
          // 控制下动画帧率
          this.lastFrameTime = this.lastFrameTime + dt;

          if (this.lastFrameTime >= this.perFrameTime) {
            this.lastFrameTime = 0;
            this.doFrame();
          }
        };

        _proto.doFrame = function doFrame() {
          var prev = this.weightsControl[0] * 10;

          if (prev === 0 && !this.playing) {
            return;
          }

          if (prev >= 10) {
            this.directionFlag = 1;
          } else if (prev <= 0) {
            this.directionFlag = 0;
          }

          if (this.directionFlag) {
            this.weightsControl[0] = (prev - 1) / 10;
          } else {
            this.weightsControl[0] = (prev + 1) / 10;
          }

          this.weightsControl = this.weightsControl;
        };

        _proto.play = function play() {
          // 笑容形变
          this.weightsControl[1] = 0;
          this.playing = true;
        };

        _proto.stop = function stop() {
          this.weightsControl[1] = 0.3;
          this.weightsControl = this.weightsControl;
          this.playing = false;
        };

        _createClass(faceAniCtrl, [{
          key: "weightsControl",
          get: function get() {
            return this._weightsControl;
          },
          set: function set(value) {
            // undo时会每个元素进行数组的一次set，等待fix
            if (value.length != this._totalTargets) {
              return;
            }

            this._weightsControl = value;
            this.setWeights(this._weightsControl);
          }
        }]);

        return faceAniCtrl;
      }(Component), _applyDecoratedDescriptor(_class2.prototype, "weightsControl", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "weightsControl"), _class2.prototype), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/first-person-camera.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, Vec3, Quat, Node, director, Canvas, systemEvent, SystemEventType, lerp, Component, Vec2;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Vec3 = module.Vec3;
      Quat = module.Quat;
      Node = module.Node;
      director = module.director;
      Canvas = module.Canvas;
      systemEvent = module.systemEvent;
      SystemEventType = module.SystemEventType;
      lerp = module.lerp;
      Component = module.Component;
      Vec2 = module.Vec2;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14;

      cclegacy._RF.push({}, "95c9fOXaX1H26KpR5ks312s", "first-person-camera", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          type = _decorator.type;
      var tempVec3 = new Vec3();
      var tempVec3_2 = new Vec3();
      var tempQuat = new Quat();
      var DeltaFactor = 1 / 200;
      var PositiveForward = new Vec3(0, 0, 1);
      var OrbitCamera = exports('default', (_dec = ccclass('OrbitCamera'), _dec2 = type(Node), _dec3 = type(Node), _dec4 = type(Vec3), _dec5 = type(Vec3), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(OrbitCamera, _Component);

        function OrbitCamera() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "enableTouch", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "enableScaleRadius", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "autoRotate", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "autoRotateSpeed", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "rotateSpeed", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "followSpeed", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "xRotationRange", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_target", _descriptor8, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "radiusScaleSpeed", _descriptor9, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "minRadius", _descriptor10, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "maxRadius", _descriptor11, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "followTargetRotationY", _descriptor12, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_startRotation", _descriptor13, _assertThisInitialized(_this));

          _this._center = new Vec3();
          _this._targetCenter = new Vec3();
          _this._touched = false;
          _this._targetRotation = new Vec3();
          _this._rotation = new Quat();

          _initializerDefineProperty(_this, "_targetRadius", _descriptor14, _assertThisInitialized(_this));

          _this._radius = 10;
          return _this;
        }

        var _proto = OrbitCamera.prototype;

        _proto.start = function start() {
          var canvas = director.getScene().getComponentInChildren(Canvas);

          if (canvas && canvas.node) {
            if (this.enableTouch) {
              canvas.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
              canvas.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
              canvas.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
            }

            if (this.enableScaleRadius) {
              canvas.node.on(Node.EventType.MOUSE_WHEEL, this.onMouseWhee, this);
            }
          } else {
            if (this.enableTouch) {
              systemEvent.on(SystemEventType.TOUCH_START, this.onTouchStart, this);
              systemEvent.on(SystemEventType.TOUCH_MOVE, this.onTouchMove, this);
              systemEvent.on(SystemEventType.TOUCH_END, this.onTouchEnd, this);
            }

            if (this.enableScaleRadius) {
              systemEvent.on(SystemEventType.MOUSE_WHEEL, this.onMouseWhee, this);
            }
          }

          this.resetTargetRotation();
          Quat.fromEuler(this._rotation, this._targetRotation.x, this._targetRotation.y, this._targetRotation.z);

          if (this.target) {
            this._targetCenter.set(this.target.worldPosition);

            this._center.set(this._targetCenter);
          }

          this._radius = this.radius;
          this.limitRotation();
        };

        _proto.resetTargetRotation = function resetTargetRotation() {
          var targetRotation = this._targetRotation.set(this._startRotation);

          if (this.followTargetRotationY) {
            targetRotation = tempVec3_2.set(targetRotation);
            Quat.toEuler(tempVec3, this.target.worldRotation);
            targetRotation.y += tempVec3.y;
          }
        };

        _proto.onTouchStart = function onTouchStart() {
          this._touched = true;
        };

        _proto.onTouchMove = function onTouchMove(touch, event) {
          if (!this._touched) return;
          var delta = touch.getDelta();
          Quat.fromEuler(tempQuat, this._targetRotation.x, this._targetRotation.y, this._targetRotation.z);
          Quat.rotateX(tempQuat, tempQuat, -delta.y * DeltaFactor);
          Quat.rotateAround(tempQuat, tempQuat, Vec3.UP, -delta.x * DeltaFactor);
          Quat.toEuler(this._targetRotation, tempQuat);
          this.limitRotation();
        };

        _proto.onTouchEnd = function onTouchEnd() {
          this._touched = false;
        };

        _proto.onMouseWhee = function onMouseWhee(event) {
          var scrollY = event.getScrollY();
          this._targetRadius += this.radiusScaleSpeed * -Math.sign(scrollY);
          this._targetRadius = Math.min(this.maxRadius, Math.max(this.minRadius, this._targetRadius));
        };

        _proto.limitRotation = function limitRotation() {
          var rotation = this._targetRotation;

          if (rotation.x < this.xRotationRange.x) {
            rotation.x = this.xRotationRange.x;
          } else if (rotation.x > this.xRotationRange.y) {
            rotation.x = this.xRotationRange.y;
          }

          rotation.z = 0;
        };

        _proto.update = function update(dt) {
          var targetRotation = this._targetRotation;

          if (this.autoRotate && !this._touched) {
            targetRotation.y += this.autoRotateSpeed * dt;
          }

          if (this.target) {
            this._targetCenter.set(this.target.worldPosition);

            if (this.followTargetRotationY) {
              targetRotation = tempVec3_2.set(targetRotation);
              Quat.toEuler(tempVec3, this.target.worldRotation);
              targetRotation.y += tempVec3.y;
            }
          }

          Quat.fromEuler(tempQuat, targetRotation.x, targetRotation.y, targetRotation.z);
          Quat.slerp(this._rotation, this._rotation, tempQuat, dt * 7 * this.rotateSpeed);
          Vec3.lerp(this._center, this._center, this._targetCenter, dt * 5 * this.followSpeed);
          this._radius = lerp(this._radius, this._targetRadius, dt * 5);
          Vec3.transformQuat(tempVec3, Vec3.FORWARD, this._rotation);
          Vec3.multiplyScalar(tempVec3, tempVec3, this._radius);
          tempVec3.add(this._center);
          this.node.position = tempVec3;
          this.node.lookAt(this._center);
        };

        _createClass(OrbitCamera, [{
          key: "radius",
          get: function get() {
            return this._targetRadius;
          },
          set: function set(v) {
            this._targetRadius = v;
          }
        }, {
          key: "target",
          get: function get() {
            return this._target;
          },
          set: function set(v) {
            this._target = v;

            this._targetRotation.set(this._startRotation);

            this._targetCenter.set(v.worldPosition);
          }
        }, {
          key: "targetRotation",
          get: function get() {
            {
              this._startRotation.set(this._targetRotation);
            }
            return this._startRotation;
          },
          set: function set(v) {
            this._targetRotation.set(v);

            this._startRotation.set(v);
          }
        }]);

        return OrbitCamera;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "enableTouch", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "enableScaleRadius", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "autoRotate", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "autoRotateSpeed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 90;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "rotateSpeed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "followSpeed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "xRotationRange", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec2(5, 70);
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "_target", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "radius", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "radius"), _class2.prototype), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "radiusScaleSpeed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "minRadius", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 5;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "maxRadius", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 10;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "target", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "target"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "targetRotation", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "targetRotation"), _class2.prototype), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "followTargetRotationY", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "_startRotation", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec3();
        }
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "_targetRadius", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 10;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/gameCtrl.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, Animation, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Animation = module.Animation;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "69f25mFFotOrLkVCTM4qwfo", "gameCtrl", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var gameCtrl = exports('gameCtrl', (_dec = ccclass('gameCtrl'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(gameCtrl, _Component);

        function gameCtrl() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.aniComponent = void 0;
          _this.anis = ['talk1', 'waving', 'talk1'];
          return _this;
        }

        var _proto = gameCtrl.prototype;

        _proto.start = function start() {
          this.aniComponent = this.node.getComponent(Animation); // this.anis = this.aniComponent.clips.map((i) => i.name);

          this.aniComponent.on(Animation.EventType.FINISHED, this.onAniPlayFinished, this);
        };

        _proto.update = function update(deltaTime) {};

        _proto.onAniPlayFinished = function onAniPlayFinished(evtname, _ref) {
          var name = _ref.name;
          console.log(name);
          var aniName = this.anis.pop();

          if (aniName) {
            this.aniComponent.crossFade(aniName, 1);
          }
        };

        return gameCtrl;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./MathUtil.ts', './cameraCtrl.ts', './clickItem.ts', './faceAniCtrl.ts', './first-person-camera.ts', './gameCtrl.ts', './test.mjs_cjs=&original=.js'], function () {
  'use strict';

  return {
    setters: [null, null, null, null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/MathUtil.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports('limit', limit);

      cclegacy._RF.push({}, "68472K7APxB5pv0zKIrX/77", "MathUtil", undefined);

      function limit(n, min, max) {
        return Math.min(max, Math.max(min, n));
      }

      cclegacy._RF.pop();
    }
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});