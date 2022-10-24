import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from 'react-hook-form';

import axios from "axios";
import { useEffect } from 'react';
import './abc.css';
import { FaRupeeSign } from 'react-icons/fa';
import Loading from "../Loading";
import Coin from "./Coin";
import { Route,BrowserRouter } from "react-router-dom";



function Homepage(){
    let [api, setApi] = useState([])
    let [error, setError] = useState([])
    let [loading, setLoading] = useState(false)
    useEffect(() => {
      axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=15&page=1&sparkline=false ").then(
        response => {
          setApi(response.data)
          setLoading(true)
        })
        .catch(err => setError(1))
    }, [])

    

    return(
    <div>
        <div className="">
     

     {
       error == 1 ? <div className="mx-auto"><h2 className="text-center mx-auto m-5 text-danger p-5">ERROR!!!!! Please Check Your Internet Connection and Refresh the page </h2></div> :
         <div>

           <div className="title  w-50 mx-auto">
             <h1 className="  text-center  text-white mt-4 mb-5 ">CRYPTO PRICES</h1>
           </div>
           <div className="heading row ">
             <h5 className="  col-sm-2 text-center text-white">IMG</h5>
             <h5 className="   col-sm-2 mb-3 text-white text-center">Coin name</h5>
             <h5 className="text-center   col-sm-2 text-white">Symbol</h5>
             <h5 className="text-center  col-sm-2 text-white">Price</h5>
             <h5 className="text-center  col-sm-2 text-white">24hr Change%</h5>
             <h5 className="text-center  col-sm-2 text-white">Rank</h5>
           </div>
           {loading==false?<Loading/>:<p></p>}
           {

             api.map(item => 
               <div className="row row1 m-2" id="coins" >
                 <img src={item.image} className="mx-auto justify-content-center  col-sm-2  "  />
                 <h5 className=" ms-2  mt-2 col-sm-2 text-white text-center " href="https://www.youtube.com/watch?v=BY1CNyKdNjE" id="coinName"  key={item.id}>{item.name}</h5>

                 <h5 className="text-center mt-2 col-sm-2 text-white  ">{item.symbol}</h5>
                 <p className="text-center mt-2 col-sm-2 text-white  "><FaRupeeSign />{item.current_price}</p>
                 {
                   item.price_change_percentage_24h < 0 ? <p className="text-center mt-2 text-danger col-sm-2 ">{item.price_change_percentage_24h.toFixed(2)}%</p> : <p className="text-center mt-2 col-sm-2 text-success  ">{item.price_change_percentage_24h}%</p>

                 }
                 <h5 className="text-center mt-2  col-sm-2 text-white  ">{item.market_cap_rank}</h5>



               </div>)
           }
           <div className="navbar navbar-inverse navbar-fixed-bottom bg-white">
             <div className="container mx-auto">
               <p className="navbar-text text-center mx-auto ">Designed By: S.Rishi Kumar</p>
             </div>
           </div>
         </div>
     }








   </div>
 


    </div>
    )
}
export default Homepage;