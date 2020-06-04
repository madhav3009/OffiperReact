import React, { useState } from "react";
import "./search.scss";
import * as algoliasearch from "algoliasearch";
import Products from '../../assets/config/products.json';
import Item from '../../components/itembanner/item/item'


const client = algoliasearch("221KT7B3J1", "49b96aef5778cd935cf7d295f430ace2");

const index = client.initIndex('offiper');

index.addObjects(Products, (err, content) => {
  console.log("objectscontent", content);
});

export default function Search() {
  const [userQuery, setUserQuery] = useState('');
  const [hits,setHits]=useState([]);
  
  async function storeQuery(e){
  let q=e.target.value;
    setUserQuery(q);
    await searchResult();
  }
  function searchResult(){
    
   
    return new Promise(resolve => {
      index
        .search({ query: userQuery })
      .then(({ hits } = {}) => {
        setHits(hits);
      })
      .catch(err => {
        console.log(err);
        console.log(err.debugData);
      });
      setTimeout(() => {
        resolve('resolved');
      }, 2000);
    });
  }
  var searchResults=null;
  if(hits.length==0){
    console.log(hits.length)
    searchResults="No result found"}else{
  searchResults=hits.map(hit=>{

  return <div style={{left:"25%",margin:"2%"}}><Item objectId={hit.objectId} src={hit.src} title={hit.title} type={hit.type} price={hit.price}  handle={hit.handle}/>
      </div>
  
    });}
  


  return (
    <div class="search-sec">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">
            <i class="fa fa-search" onClick={searchResult}/>
          </span>
        </div>
       
        <input
          type="text"
          class="form-control"
          onChange={e => {
            storeQuery(e);
          }}
        />
        <div class="input-group-append">
          <span class="input-group-text">
            <i class="fa fa-times" />
          </span>
        </div>
      </div>
      <div class="row">
      {searchResults}
      </div>
    </div>
  );
}
