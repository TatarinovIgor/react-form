import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


class Home extends React.Component {

  WalletToDeposit = ""
  CurrentSelectorState = ""
  EthereumUSDTStatus = true
  TronUSDTStatus = false
  BitcoinStatus = false
  SetSelectorStatus(state){
    this.CurrentSelectorState = state
    if (this.CurrentSelectorState === "EthereumUSDT"){
      this.EthereumUSDTStatus = true
      this.TronUSDTStatus = false
      this.BitcoinStatus = false
    } else if (this.CurrentSelectorState === "TronUSDT"){
      this.EthereumUSDTStatus = false
      this.TronUSDTStatus = true
      this.BitcoinStatus = false
    } else if (this.CurrentSelectorState === "Bitcoin"){
      this.EthereumUSDTStatus = false
      this.TronUSDTStatus = false
      this.BitcoinStatus = true
    }
    this.forceUpdate()
    return(state)
  }


  Deposit(ethStatus, trnStatus, btcStatus) {
    const queryParams = new URLSearchParams(window.location.search)
    const AuthToken = queryParams.get("token")

    if (ethStatus){
      this.PerformDepositRequest(AuthToken,"Ethereum")
    } else if (trnStatus){
      this.PerformDepositRequest(AuthToken,"Tron")
    } else if (btcStatus){
      this.PerformDepositRequest(AuthToken, "Bitcoin")
    }
  }


  PerformDepositRequest(AuthToken, blockchain){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", AuthToken)
    myHeaders.append("Content-Type", "application/json")

    fetch("https://crypto-processing-api.bird-house.link/deposit",{
      method: "POST",
      mode: "cors",
      headers: myHeaders,
      body: JSON.stringify({"amount": 1,
        "blockchain":blockchain,
        "asset":"USDT",
        "issuer":""
      })
    }
    ).then(response => response.text())
      .then(result => console.log(result))
  }


  render() {

    return (

      <div className="maincontainer">
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-7 mx-auto">
              <div className="bg-white rounded-lg shadow-sm p-5" style={{display:"flex", justifyContent:"space-around"}} >

                <ul role="tablist" class="nav bg-light nav-pills rounded-pill nav-fill mb-3" style={{display:"flex", flexDirection:"column"}}>
                  <li onClick={() => console.log(this.SetSelectorStatus("EthereumUSDT"))} class="nav-item">
                    <a data-toggle="pill" className={this.EthereumUSDTStatus ? "nav-link active rounded-pill" : "nav-link rounded-pill"}>
                      <i class="fa fa-credit-card"></i>
                      Ethereum (USDT)
                    </a>
                  </li>
                  <li onClick={() => console.log(this.SetSelectorStatus("TronUSDT"))} class="nav-item">
                    <a data-toggle="pill" className={this.TronUSDTStatus ? "nav-link active rounded-pill" : "nav-link rounded-pill"}>
                      <i class="fa fa-paypal"></i>
                      Tron (USDT)
                    </a>
                  </li>
                  <li onClick={() => console.log(this.SetSelectorStatus("Bitcoin"))} class="nav-item">
                    <a data-toggle="pill" className={this.BitcoinStatus ? "nav-link active rounded-pill" : "nav-link rounded-pill"}>
                      <i class="fa fa-university"></i>
                      Bitcoin
                    </a>
                  </li>
                </ul>

                <div class="tab-content">

                  <div id="nav-tab-card" class="tab-pane fade show active">
                    <form role="form">
                      <div class="form-group">
                        <br></br>
                        <label>Wallet for deposit:</label>
                        <br></br>
                        <input type="text" name="username" disabled="true" placeholder={this.WalletToDeposit} class="form-control" />
                      </div>
                      <br></br>
                      <button onClick={this.Deposit(this.EthereumUSDTStatus, this.TronUSDTStatus, this.BitcoinStatus)} type="button" class="subscribe btn btn-primary btn-block rounded-pill shadow-sm"> Confirm  </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    )
  };
}
export default Home;
