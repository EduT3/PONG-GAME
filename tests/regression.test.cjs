const test = require('node:test');
const assert = require('node:assert/strict');
const { context, element } = require('./dom.cjs');

test('one score per crossing and ball resets to center', () => {
 const t = context({ width: 600, height: 400 }); t.load('PONG_2023_02_06_21_44_46/sketch.js');
 t.run('ponto = { play() {} }; xBolinha = 610; marcaPonto(); marcaPonto();');
 assert.equal(t.run('meusPontos'), 1); assert.equal(t.run('xBolinha'), 300);
 t.run('xBolinha = -10; marcaPonto(); marcaPonto();'); assert.equal(t.run('pontosOponente'), 1);
});
test('paddle remains within canvas', () => {
 const t = context({ width: 600, height: 400, UP_ARROW: 38, DOWN_ARROW: 40, keyIsDown: () => true, constrain: (v,a,b) => Math.max(a,Math.min(b,v)) });
 t.load('PONG_2023_02_06_21_44_46/sketch.js'); t.run('yRaquete = 900; movimentaMinhaRaquete();'); assert.equal(t.run('yRaquete'), 310);
});
