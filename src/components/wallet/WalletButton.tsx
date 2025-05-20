import React, { useState } from 'react';
import { Wallet, ExternalLink, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useWallet } from '../../context/WalletContext';

const WalletButton: React.FC = () => {
  const { 
    isConnected, 
    walletAddress, 
    balance, 
    connectWallet, 
    disconnectWallet, 
    isConnecting,
    error
  } = useWallet();
  
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleConnect = async () => {
    await connectWallet();
  };

  const handleDisconnect = () => {
    disconnectWallet();
    setShowDropdown(false);
  };

  const formatAddress = (address: string | null) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className="relative">
      {isConnected ? (
        <button
          onClick={toggleDropdown}
          className="flex items-center px-3 py-2 rounded-lg bg-primary-50 text-primary-700 hover:bg-primary-100 transition-colors"
        >
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 mr-2 text-success-500" />
            <span className="font-medium">{formatAddress(walletAddress)}</span>
          </div>
        </button>
      ) : (
        <button
          onClick={handleConnect}
          disabled={isConnecting}
          className="flex items-center px-3 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors disabled:opacity-70"
        >
          {isConnecting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              <span>Connecting...</span>
            </>
          ) : (
            <>
              <Wallet className="h-4 w-4 mr-2" />
              <span>Connect Wallet</span>
            </>
          )}
        </button>
      )}
      
      {error && (
        <div className="absolute right-0 mt-2 p-3 bg-error-50 border border-error-200 rounded-md shadow-lg z-20 w-64">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-error-500 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-error-700">{error}</p>
          </div>
        </div>
      )}
      
      {isConnected && showDropdown && (
        <div className="absolute right-0 mt-2 bg-white border border-neutral-200 rounded-md shadow-lg z-20 w-64">
          <div className="p-3 border-b border-neutral-200">
            <p className="text-sm text-neutral-500">Connected as</p>
            <p className="font-medium text-neutral-900 truncate">{walletAddress}</p>
          </div>
          
          <div className="p-3 border-b border-neutral-200">
            <p className="text-sm text-neutral-500">Balance</p>
            <p className="font-medium text-neutral-900">{balance ? `${parseFloat(balance).toFixed(4)} ETH` : 'Loading...'}</p>
          </div>
          
          <div className="p-2">
            <a 
              href={`https://etherscan.io/address/${walletAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center w-full text-left px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 rounded-md"
            >
              <ExternalLink className="h-4 w-4 mr-2 text-neutral-500" />
              View on Etherscan
            </a>
            
            <button
              onClick={handleDisconnect}
              className="flex items-center w-full text-left px-3 py-2 text-sm text-error-600 hover:bg-error-50 rounded-md"
            >
              <Wallet className="h-4 w-4 mr-2" />
              Disconnect Wallet
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletButton;