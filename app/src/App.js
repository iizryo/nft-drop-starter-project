import React, { useEffect, useState } from "react";
import "./App.css";
import twitterLogo from "./assets/twitter-logo.svg";
import CandyMachine from "./CandyMachine";

// 定数の宣言
const TWITTER_HANDLE = "iizryo";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  // State
  const [walletAddress, setWalletAddress] = useState(null);

  // Actions
  /*
   * 関数を宣言します
   */
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana && solana.isPhantom) {
        console.log("Phantom wallet found!");

        /*
         * "solana"オブジェクトは、ユーザーのウォレットに直接
         * 接続できる機能を提供しています。
         * 下記からコードを修正してください。
         */
        const response = await solana.connect({ onlyIfTrusted: true });
        console.log("Connected with Public Key:", response.publicKey.toString());

        /*
         * ユーザーの公開鍵を後から使える状態にします。
         */
        setWalletAddress(response.publicKey.toString());
      } else {
        alert("Solana object not found! Get a Phantom Wallet 👻");
      }
    } catch (error) {
      console.error(error);
    }
  };

  /*
   * コードが壊れないように、下記関数を定義しましょう。
   * 下記はその関数の実装です。
   */
  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log("Connected with Public Key:", response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  /*
   * ユーザーがまだウォレットをアプリに接続していないときに
   * このUIを表示します。
   */
  const renderNotConnectedContainer = () => (
    <button className="cta-button connect-wallet-button" onClick={connectWallet}>
      Connect to Wallet
    </button>
  );

  /*
   * コンポーネントが最初にマウントされたら、Phantom Walletが
   * 接続されているかどうかを確認しましょう。
   */
  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">🍺 Beer Drop</p>
          <p className="sub-text">Which beer do you like?</p>
          {!walletAddress && renderNotConnectedContainer()}
        </div>
        {/* walletAddressを確認してから、walletAddressを渡します*/}
        {walletAddress && <CandyMachine walletAddress={window.solana} />}
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
