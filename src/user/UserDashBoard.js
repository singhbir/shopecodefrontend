import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import Terminal from "terminal-in-react";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { findOrderbyUserId } from "../core/helper/orderHelper";


const UserDashBoard = () => {
  const { user ,token} = isAuthenticated();
  const [data, setData] = useState([])

  const myfunction = async () => {
    setData(await findOrderbyUserId(user._id,token))
  }
  useEffect(() => {
    myfunction()
  }, [])
  
  

  return (
    <Base title="User Page" description="Check Your Previous Orders">
      <div className="table-responsive">
      <table className="table table-striped  table-hover table-dark">
        <thead>
        <tr>
           <th scope="col">Date</th>
           <th scope="col" >Products</th>
           <th scope="col" >Amount</th>
           <th scope="col">Total</th>
        </tr>
        </thead>
        <tbody>
        {data.map((d,index)=>{
          let datacol = d.products.length
          let colspand = datacol.toString()
          return (
            <tr key={index}>
            <th scope="row">{d.createdAt.slice(0,10)}</th>
            <td><table className="table table-striped  table-hover table-dark"><tbody>{d.products.map((da,i)=>{
                   return(
                     
                     <tr key={i}><td>{da.name}</td></tr>
                     
                   ) 
            })}</tbody></table></td>


            <td><table className="table table-striped  table-hover table-dark"><tbody>{d.products.map((da,i)=>{
                   return(
                     
                     <tr key={i}><td>{da.price}</td></tr>
                     
                   ) 
            })}</tbody></table></td>
            <td>{d.amount}</td>
        </tr>
         )})
        
        }
      </tbody>
      </table>
      </div>
    </Base>
  );
};

export default UserDashBoard;
