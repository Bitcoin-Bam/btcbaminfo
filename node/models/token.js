const Sequelize = require('sequelize')

function generate(sequelize) {
  let BRC20 = sequelize.define('brc20', {
    contractAddress: {
      type: Sequelize.CHAR(20).BINARY,
      primaryKey: true
    },
    name: Sequelize.BLOB,
    symbol: Sequelize.BLOB,
    decimals: Sequelize.INTEGER(3).UNSIGNED,
    totalSupply: {
      type: Sequelize.CHAR(32).BINARY,
      get() {
        let totalSupply = this.getDataValue('totalSupply')
        return totalSupply == null ? null : BigInt(`0x${totalSupply.toString('hex')}`)
      },
      set(totalSupply) {
        if (totalSupply != null) {
          this.setDataValue(
            'totalSupply',
            Buffer.from(totalSupply.toString(16).padStart(64, '0'), 'hex')
          )
        }
      }
    },
    version: {
      type: Sequelize.BLOB,
      allowNull: true
    }
  }, {freezeTableName: true, underscored: true, timestamps: false})

  let BRC20Balance = sequelize.define('brc20_balance', {
    contractAddress: {
      type: Sequelize.CHAR(20).BINARY,
      primaryKey: true
    },
    address: {
      type: Sequelize.CHAR(20).BINARY,
      primaryKey: true
    },
    balance: {
      type: Sequelize.CHAR(32).BINARY,
      get() {
        let balance = this.getDataValue('balance')
        return balance == null ? null : BigInt(`0x${balance.toString('hex')}`)
      },
      set(balance) {
        if (balance != null) {
          this.setDataValue(
            'balance',
            Buffer.from(balance.toString(16).padStart(64, '0'), 'hex')
          )
        }
      }
    }
  }, {freezeTableName: true, underscored: true, timestamps: false})

  let Src721 = sequelize.define('brc721', {
    contractAddress: {
      type: Sequelize.CHAR(20).BINARY,
      primaryKey: true
    },
    name: Sequelize.BLOB,
    symbol: Sequelize.BLOB,
    totalSupply: {
      type: Sequelize.CHAR(32).BINARY,
      get() {
        let totalSupply = this.getDataValue('totalSupply')
        return totalSupply == null ? null : BigInt(`0x${totalSupply.toString('hex')}`)
      },
      set(totalSupply) {
        if (totalSupply != null) {
          this.setDataValue(
            'totalSupply',
            Buffer.from(totalSupply.toString(16).padStart(64, '0'), 'hex')
          )
        }
      }
    }
  }, {freezeTableName: true, underscored: true, timestamps: false})

  let BRC721Token = sequelize.define('brc721_token', {
    contractAddress: {
      type: Sequelize.CHAR(20).BINARY,
      primaryKey: true
    },
    tokenId: {
      type: Sequelize.CHAR(32).BINARY,
      primaryKey: true
    },
    holder: Sequelize.CHAR(20).BINARY
  }, {freezeTableName: true, underscored: true, timestamps: false})

  sequelize.models.contract.hasOne(BRC20, {as: 'brc20', foreignKey: 'contractAddress'})
  BRC20.belongsTo(sequelize.models.contract, {as: 'contract', foreignKey: 'contractAddress'})
  sequelize.models.contract.hasMany(BRC20Balance, {as: 'brc20Balances', foreignKey: 'contractAddress'})
  BRC20Balance.belongsTo(sequelize.models.contract, {as: 'contract', foreignKey: 'contractAddress'})
  sequelize.models.contract.hasOne(Src721, {as: 'brc721', foreignKey: 'contractAddress'})
  Src721.belongsTo(sequelize.models.contract, {as: 'contract', foreignKey: 'contractAddress'})
  sequelize.models.contract.hasMany(BRC721Token, {as: 'brc721Tokens', foreignKey: 'contractAddress'})
  BRC721Token.belongsTo(sequelize.models.contract, {as: 'contract', foreignKey: 'contractAddress'})
}

module.exports = generate
