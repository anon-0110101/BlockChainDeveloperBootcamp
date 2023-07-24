import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import config from '../config.json'; 

import { 
  loadProvider, 
  loadNetwork, 
  loadAccount,
  loadTokens,
  loadExchange,
  subscribeToEvents
} from '../store/interactions';

import Navbar from './Navbar';
import Markets from './Markets';
import Balance from './Balance';
import Order from './Order';

function App() {
  const dispatch = useDispatch()

  const loadBlockchainData = async () => {
    // Connect ethers to blockchain
    const provider = loadProvider(dispatch)
    
    //fetch current networks chainId(ex. hardhat 31337, kovan: 42)
    const chainId = await loadNetwork(provider, dispatch)

    window.ethereum.on('chainChanged', () => {
      window.location.reload()
    })

    //fetch current account and balance from Metamask
    window.ethereum.on('accountsChanged', () => {
    loadAccount(provider, dispatch)
    })
    // Token smart contract
    const RanchoToken = config[chainId].RanchoToken
    const mETH = config[chainId].mETH

    await loadTokens(provider, [RanchoToken.address, mETH.address], dispatch)
    
    const exchangeConf = config[chainId].exchange
    const exchange = await loadExchange(provider, exchangeConf.address, dispatch)


    subscribeToEvents(exchange, dispatch)

  }

  useEffect(() => {
    loadBlockchainData()
    
  })
  return (
    <div>

      <Navbar />

      <main className='exchange grid'>
        <section className='exchange__section--left grid'>

          <Markets />

          <Balance />

          <Order />

        </section>
        <section className='exchange__section--right grid'>

          {/* PriceChart */}

          {/* Transactions */}

          {/* Trades */}

          {/* OrderBook */}

        </section>
      </main>

      {/* Alert */}

    </div>
  );
}

export default App;
