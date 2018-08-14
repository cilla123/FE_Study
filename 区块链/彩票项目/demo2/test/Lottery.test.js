const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());

const { interface, bytecode } = require('../compile');

let accounts;
let contract;

beforeEach( async () => {
  accounts = await web3.eth.getAccounts();
  contract = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode
    })
    .send({
      from: accounts[0],
      gas: 1000000
    })
});

describe('lottery', async () => {

  it('测试合同部署 deploy', () => {
    assert.ok(contract);
  })

  it('测试投注彩票', async () => {

    await contract.methods.enter().send({
      from: accounts[1],
      value: 1000000000000000000
    });

    const players = await contract.methods.getAllPlayers().call({
      from: accounts[0],
    })
    assert(1, players.length);

    const money = await contract.methods.queryPoolMoney().call({
      from: accounts[1]
    });
    assert(money, 1000000000000000000)

  })

})