"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IPFS = void 0;
var http_1 = require("http");
var Ipfs = require("ipfs");
var IPFS = /** @class */ (function () {
    function IPFS(options) {
        this.options = options;
    }
    IPFS.prototype.url = function (path, type) {
        if (type)
            type = "." + type;
        return "http://" + this.options.gateway.host + ":" + this.options.gateway.port + "/ipfs/" + path + type;
    };
    IPFS.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, Ipfs.create({ repo: this.options.dir })];
                    case 1:
                        _a.ipfs = _b.sent();
                        return [4 /*yield*/, this.runExpress()];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    IPFS.prototype.add = function (data, raw) {
        if (raw === void 0) { raw = false; }
        return __awaiter(this, void 0, void 0, function () {
            var path;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ipfs.add(raw ? data : JSON.stringify(data))];
                    case 1:
                        path = (_a.sent()).path;
                        return [2 /*return*/, path];
                }
            });
        });
    };
    IPFS.prototype.get = function (hash, raw) {
        var e_1, _a;
        if (raw === void 0) { raw = false; }
        return __awaiter(this, void 0, void 0, function () {
            var stream, data, stream_1, stream_1_1, chunk, e_1_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        stream = this.ipfs.cat(hash);
                        data = '';
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, 7, 12]);
                        stream_1 = __asyncValues(stream);
                        _b.label = 2;
                    case 2: return [4 /*yield*/, stream_1.next()];
                    case 3:
                        if (!(stream_1_1 = _b.sent(), !stream_1_1.done)) return [3 /*break*/, 5];
                        chunk = stream_1_1.value;
                        data += chunk.toString();
                        _b.label = 4;
                    case 4: return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 12];
                    case 6:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 12];
                    case 7:
                        _b.trys.push([7, , 10, 11]);
                        if (!(stream_1_1 && !stream_1_1.done && (_a = stream_1.return))) return [3 /*break*/, 9];
                        return [4 /*yield*/, _a.call(stream_1)];
                    case 8:
                        _b.sent();
                        _b.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 11: return [7 /*endfinally*/];
                    case 12: return [2 /*return*/, raw ? data : JSON.parse(data)];
                }
            });
        });
    };
    IPFS.prototype.runExpress = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, host, port, app;
            var _this = this;
            return __generator(this, function (_b) {
                _a = this.options.gateway, host = _a.host, port = _a.port;
                app = http_1.createServer(function (rq, rs) { return __awaiter(_this, void 0, void 0, function () {
                    var url, cid, _a, _b, exc_1;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                url = rq.url;
                                if (!url || !url.startsWith("/ipfs/")) {
                                    rs.statusCode = 404;
                                    rs.end("Not Found.");
                                    return [2 /*return*/];
                                }
                                _c.label = 1;
                            case 1:
                                _c.trys.push([1, 3, , 4]);
                                cid = url.substring(6, url.includes(".") ? url.indexOf(".") : url.length);
                                rs.statusCode = 200;
                                _b = (_a = rs).end;
                                return [4 /*yield*/, this.get(cid, true)];
                            case 2:
                                _b.apply(_a, [_c.sent()]);
                                return [3 /*break*/, 4];
                            case 3:
                                exc_1 = _c.sent();
                                rs.statusCode = 500;
                                rs.end(exc_1.message);
                                console.log(exc_1);
                                return [3 /*break*/, 4];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/, new Promise(function (resolve) { return app.listen(port, function () {
                        resolve();
                    }); })];
            });
        });
    };
    return IPFS;
}());
exports.IPFS = IPFS;
//# sourceMappingURL=index.js.map