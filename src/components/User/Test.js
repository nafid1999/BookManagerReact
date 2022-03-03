import { faEdit, faList, faSearch, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Card, FormControl, Image, InputGroup, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MyToast from '../Toast';
import {  useSelector,useDispatch } from 'react-redux'
import { fetchUsers,deleteUser } from '../../services/User/user/actions'
import { Query,useQuery } from '@redux-requests/react';
import { getQuery } from '@redux-requests/core';



let coverPhotoURL = "https://images-na.ssl-images-amazon.com/images/I/417zLTa1uqL._SX397_BO1,204,203,200_.jpg"

export const FETCH_PHOTO = 'FETCH_PHOTO';
export const FETCH_PHOTOS = 'FETCH_PHOTOS';
export const FETCH_POST = 'FETCH_POST';

 const fetchPhoto = id => ({
    type: FETCH_PHOTO,
    request: { url: `/photos/${id}` },
  });

  const fetchtodos = id => ({
    type: FETCH_PHOTOS,
    request: { url: `/photos/` },
  });
  
  const RequestError = () => (
    <p>There was some error during fetching. Please try again.</p>
  );
 
const Test = () => {

    const { data, error, loading, pristine }  = useQuery({ type: FETCH_PHOTOS })

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchtodos())
        console.log(data[0])

    }, [data])
    

    return (
        <div>
        

            <Card className="bg-dark text-white mt-5 border border-dark">
                <Card.Header>
                    <div style={{ float: "left" }}>
                        <FontAwesomeIcon icon={faList} />&nbsp;
                        user List
                    </div>
                  
                </Card.Header>
                <Card.Body>
                <div>
        <button
          type="button"
          onClick={() => dispatch(fetchPhoto(1))}
        >
          Fetch photo with id 1
        </button>
        <button
          type="button"
         
          onClick={() => dispatch(fetchPhoto(10001))}
        >
          Fetch non-existent photo
        </button>
        <Query
          type={FETCH_PHOTO}
          errorComponent={RequestError}
          loadingComponent={()=><p>Loading ....</p>}
          noDataMessage={<p>There is no entity currently.</p>}
        >
          {({ data }) => <div>
                    <h3>{data.title}</h3>
                    <img src={data.thumbnailUrl} alt={data.title} />
                 </div> }
        </Query>
      </div>
                </Card.Body>
            </Card>

        </div>
    )
}

export default Test