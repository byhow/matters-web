import { utils } from 'ethers'

// export const ERC20ABI = [
//   {
//     inputs: [
//       { internalType: 'string', name: 'name_', type: 'string' },
//       { internalType: 'string', name: 'symbol_', type: 'string' },
//       { internalType: 'uint8', name: 'decimals_', type: 'uint8' },
//     ],
//     stateMutability: 'nonpayable',
//     type: 'constructor',
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: true,
//         internalType: 'address',
//         name: 'owner',
//         type: 'address',
//       },
//       {
//         indexed: true,
//         internalType: 'address',
//         name: 'spender',
//         type: 'address',
//       },
//       {
//         indexed: false,
//         internalType: 'uint256',
//         name: 'value',
//         type: 'uint256',
//       },
//     ],
//     name: 'Approval',
//     type: 'event',
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: false,
//         internalType: 'address',
//         name: 'userAddress',
//         type: 'address',
//       },
//       {
//         indexed: false,
//         internalType: 'address payable',
//         name: 'relayerAddress',
//         type: 'address',
//       },
//       {
//         indexed: false,
//         internalType: 'bytes',
//         name: 'functionSignature',
//         type: 'bytes',
//       },
//     ],
//     name: 'MetaTransactionExecuted',
//     type: 'event',
//   },
//   {
//     anonymous: false,
//     inputs: [
//       { indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
//       {
//         indexed: true,
//         internalType: 'bytes32',
//         name: 'previousAdminRole',
//         type: 'bytes32',
//       },
//       {
//         indexed: true,
//         internalType: 'bytes32',
//         name: 'newAdminRole',
//         type: 'bytes32',
//       },
//     ],
//     name: 'RoleAdminChanged',
//     type: 'event',
//   },
//   {
//     anonymous: false,
//     inputs: [
//       { indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
//       {
//         indexed: true,
//         internalType: 'address',
//         name: 'account',
//         type: 'address',
//       },
//       {
//         indexed: true,
//         internalType: 'address',
//         name: 'sender',
//         type: 'address',
//       },
//     ],
//     name: 'RoleGranted',
//     type: 'event',
//   },
//   {
//     anonymous: false,
//     inputs: [
//       { indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
//       {
//         indexed: true,
//         internalType: 'address',
//         name: 'account',
//         type: 'address',
//       },
//       {
//         indexed: true,
//         internalType: 'address',
//         name: 'sender',
//         type: 'address',
//       },
//     ],
//     name: 'RoleRevoked',
//     type: 'event',
//   },
//   {
//     anonymous: false,
//     inputs: [
//       { indexed: true, internalType: 'address', name: 'from', type: 'address' },
//       { indexed: true, internalType: 'address', name: 'to', type: 'address' },
//       {
//         indexed: false,
//         internalType: 'uint256',
//         name: 'value',
//         type: 'uint256',
//       },
//     ],
//     name: 'Transfer',
//     type: 'event',
//   },
//   {
//     inputs: [],
//     name: 'CHILD_CHAIN_ID',
//     outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     inputs: [],
//     name: 'CHILD_CHAIN_ID_BYTES',
//     outputs: [{ internalType: 'bytes', name: '', type: 'bytes' }],
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     inputs: [],
//     name: 'DEFAULT_ADMIN_ROLE',
//     outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     inputs: [],
//     name: 'DEPOSITOR_ROLE',
//     outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     inputs: [],
//     name: 'ERC712_VERSION',
//     outputs: [{ internalType: 'string', name: '', type: 'string' }],
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     inputs: [],
//     name: 'ROOT_CHAIN_ID',
//     outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     inputs: [],
//     name: 'ROOT_CHAIN_ID_BYTES',
//     outputs: [{ internalType: 'bytes', name: '', type: 'bytes' }],
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     inputs: [
//       { internalType: 'address', name: 'owner', type: 'address' },
//       { internalType: 'address', name: 'spender', type: 'address' },
//     ],
//     name: 'allowance',
//     outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     inputs: [
//       { internalType: 'address', name: 'spender', type: 'address' },
//       { internalType: 'uint256', name: 'amount', type: 'uint256' },
//     ],
//     name: 'approve',
//     outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
//     stateMutability: 'nonpayable',
//     type: 'function',
//   },
//   {
//     inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
//     name: 'balanceOf',
//     outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     inputs: [],
//     name: 'decimals',
//     outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     inputs: [
//       { internalType: 'address', name: 'spender', type: 'address' },
//       { internalType: 'uint256', name: 'subtractedValue', type: 'uint256' },
//     ],
//     name: 'decreaseAllowance',
//     outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
//     stateMutability: 'nonpayable',
//     type: 'function',
//   },
//   {
//     inputs: [
//       { internalType: 'address', name: 'user', type: 'address' },
//       { internalType: 'bytes', name: 'depositData', type: 'bytes' },
//     ],
//     name: 'deposit',
//     outputs: [],
//     stateMutability: 'nonpayable',
//     type: 'function',
//   },
//   {
//     inputs: [
//       { internalType: 'address', name: 'userAddress', type: 'address' },
//       { internalType: 'bytes', name: 'functionSignature', type: 'bytes' },
//       { internalType: 'bytes32', name: 'sigR', type: 'bytes32' },
//       { internalType: 'bytes32', name: 'sigS', type: 'bytes32' },
//       { internalType: 'uint8', name: 'sigV', type: 'uint8' },
//     ],
//     name: 'executeMetaTransaction',
//     outputs: [{ internalType: 'bytes', name: '', type: 'bytes' }],
//     stateMutability: 'payable',
//     type: 'function',
//   },
//   {
//     inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
//     name: 'getNonce',
//     outputs: [{ internalType: 'uint256', name: 'nonce', type: 'uint256' }],
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     inputs: [{ internalType: 'bytes32', name: 'role', type: 'bytes32' }],
//     name: 'getRoleAdmin',
//     outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     inputs: [
//       { internalType: 'bytes32', name: 'role', type: 'bytes32' },
//       { internalType: 'uint256', name: 'index', type: 'uint256' },
//     ],
//     name: 'getRoleMember',
//     outputs: [{ internalType: 'address', name: '', type: 'address' }],
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     inputs: [{ internalType: 'bytes32', name: 'role', type: 'bytes32' }],
//     name: 'getRoleMemberCount',
//     outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     inputs: [
//       { internalType: 'bytes32', name: 'role', type: 'bytes32' },
//       { internalType: 'address', name: 'account', type: 'address' },
//     ],
//     name: 'grantRole',
//     outputs: [],
//     stateMutability: 'nonpayable',
//     type: 'function',
//   },
//   {
//     inputs: [
//       { internalType: 'bytes32', name: 'role', type: 'bytes32' },
//       { internalType: 'address', name: 'account', type: 'address' },
//     ],
//     name: 'hasRole',
//     outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     inputs: [
//       { internalType: 'address', name: 'spender', type: 'address' },
//       { internalType: 'uint256', name: 'addedValue', type: 'uint256' },
//     ],
//     name: 'increaseAllowance',
//     outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
//     stateMutability: 'nonpayable',
//     type: 'function',
//   },
//   {
//     inputs: [],
//     name: 'name',
//     outputs: [{ internalType: 'string', name: '', type: 'string' }],
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     inputs: [
//       { internalType: 'bytes32', name: 'role', type: 'bytes32' },
//       { internalType: 'address', name: 'account', type: 'address' },
//     ],
//     name: 'renounceRole',
//     outputs: [],
//     stateMutability: 'nonpayable',
//     type: 'function',
//   },
//   {
//     inputs: [
//       { internalType: 'bytes32', name: 'role', type: 'bytes32' },
//       { internalType: 'address', name: 'account', type: 'address' },
//     ],
//     name: 'revokeRole',
//     outputs: [],
//     stateMutability: 'nonpayable',
//     type: 'function',
//   },
//   {
//     inputs: [],
//     name: 'symbol',
//     outputs: [{ internalType: 'string', name: '', type: 'string' }],
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     inputs: [],
//     name: 'totalSupply',
//     outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     inputs: [
//       { internalType: 'address', name: 'recipient', type: 'address' },
//       { internalType: 'uint256', name: 'amount', type: 'uint256' },
//     ],
//     name: 'transfer',
//     outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
//     stateMutability: 'nonpayable',
//     type: 'function',
//   },
//   {
//     inputs: [
//       { internalType: 'address', name: 'sender', type: 'address' },
//       { internalType: 'address', name: 'recipient', type: 'address' },
//       { internalType: 'uint256', name: 'amount', type: 'uint256' },
//     ],
//     name: 'transferFrom',
//     outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
//     stateMutability: 'nonpayable',
//     type: 'function',
//   },
//   {
//     inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
//     name: 'withdraw',
//     outputs: [],
//     stateMutability: 'nonpayable',
//     type: 'function',
//   },
//   { stateMutability: 'payable', type: 'receive' },
// ]
export const ERC20ABI = [{"inputs":[{"internalType":"string","name":"name_","type":"string"},{"internalType":"string","name":"symbol_","type":"string"},{"internalType":"uint8","name":"decimals_","type":"uint8"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"userAddress","type":"address"},{"indexed":false,"internalType":"address payable","name":"relayerAddress","type":"address"},{"indexed":false,"internalType":"bytes","name":"functionSignature","type":"bytes"}],"name":"MetaTransactionExecuted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"CHILD_CHAIN_ID","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"CHILD_CHAIN_ID_BYTES","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DEPOSITOR_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ERC712_VERSION","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ROOT_CHAIN_ID","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ROOT_CHAIN_ID_BYTES","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"bytes","name":"depositData","type":"bytes"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"},{"internalType":"bytes","name":"functionSignature","type":"bytes"},{"internalType":"bytes32","name":"sigR","type":"bytes32"},{"internalType":"bytes32","name":"sigS","type":"bytes32"},{"internalType":"uint8","name":"sigV","type":"uint8"}],"name":"executeMetaTransaction","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getNonce","outputs":[{"internalType":"uint256","name":"nonce","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getRoleMember","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleMemberCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}] as const

export const curationABI = [
  {
    inputs: [],
    name: 'InvalidURI',
    type: 'error',
  },
  {
    inputs: [],
    name: 'SelfCuration',
    type: 'error',
  },
  {
    inputs: [],
    name: 'TransferFailed',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ZeroAddress',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ZeroAmount',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'curator',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'creator',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'string',
        name: 'uri',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'contract IERC20',
        name: 'token',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'Curation',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'curator',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'creator',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'string',
        name: 'uri',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'Curation',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'creator_',
        type: 'address',
      },
      {
        internalType: 'contract IERC20',
        name: 'token_',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount_',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'uri_',
        type: 'string',
      },
    ],
    name: 'curate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId_',
        type: 'bytes4',
      },
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]  as const

export const ERC20Interface = new utils.Interface(ERC20ABI)
export const curationInterface = new utils.Interface(curationABI)
