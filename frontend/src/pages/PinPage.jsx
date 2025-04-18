// import React, { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { PinData } from '../context/PinContext';
// import { Loading } from '../components/Loading';
// import { MdDelete } from "react-icons/md";


// function PinPage({user}) {
//     const params = useParams();
    
//     const {loading, fetchPin, pin} = PinData();
//     console.log(pin);

//     useEffect(() =>{
//         fetchPin(params.id);
//     },[params.id]);
//     return (
//         <div>
//           {
//             pin && <div className='flex flex-col items-center bg-gray-100 p-4 min-h-screen'>
//               {loading ? <Loading/>: <div className='bg-white rounded-lg shadow-lg flex flex-wrap w-full max-w-4xl'>
//                     <div className="cw-full md:w-1/2 bg-gray-200 rounded-t-lg md:rounded-t-none flex items-center justify-center">
//                     {pin.image && ( <img src={pin.image.url} 
//                     alt="" 
//                     className='object-cover w-full
//                     rounded-t-lg md:rounded-l-lg md:roundedtnone'/>
//                     )}
//                     </div>

//                     <div className="w-full md:w-1/2 p-6 flex flex-col">
//                  <div className="flex items-center justify-between mb-4">
//                  <h1 className="text-2xl font-bold">{pin.title}</h1>

//                       {
//                         pin.owner && pin.owner._id === user._id && (<button className='bg-red-500 text-white py-1 px-3 rounded'> 
//                           <MdDelete/>
//                         </button>
//                       )}
//                     </div>

//                     <p className='mb-6'>{pin.pin}</p>
//                     {
//                       pin.owner && <div className='flex items-center justify-between border-b pb-4 mb-4'>
//                         <div className='flex  items-center'>
//                           <Link to={`/user/${pin.owner._id}`}>
//                           <div className='rounded-full h-12 w-12 bg-gray-300 flex items-center justify-center'>
//                             <span className='font-bold'>
//                               {pin.owner.name.slice(0,1)}</span>
//                           </div>
//                           </Link>

//                           <div className='"ml-4'>
//                             <h2 className='text-lg font-semibold'>{pin.owner.name}</h2>
//                             <p className='text-gray-500'>{pin.owner.followers.length} Followers</p>
//                           </div>
//                         </div>
//                       </div>
//                     }
//                     </div>
//                 </div>}
//             </div>
//           }
//         </div>
//       )
      
// }

// export default PinPage


import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PinData } from '../context/PinContext';
import { Loading } from '../components/Loading';
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

function PinPage({ user }) {
  const params = useParams();
  const { loading, fetchPin, pin } = PinData();


  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [pinValue, setPinValue] = useState("");

  // function of button of edit
  function editHandler() {
    setEdit(!edit);
  };

  useEffect(() => {
    fetchPin(params.id);
  }, [params.id]);

  return (
    <div>
      {pin && (
        <div className="flex flex-col items-center bg-gray-100 p-4 min-h-screen">
          {loading ? (
            <Loading />
          ) : (
            <div className="bg-white rounded-lg shadow-lg flex flex-wrap w-full max-w-4xl">
              <div className="w-full md:w-1/2 bg-gray-200 rounded-t-lg md:rounded-t-none flex items-center justify-center">
                {pin.image && (
                  <img
                    src={pin.image.url}
                    alt=""
                    className="object-cover w-full rounded-t-lg md:rounded-l-lg md:rounded-none"
                  />
                )}
              </div>

              <div className="w-full md:w-1/2 p-6 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  
                      {
                        edit ? ( <input 
                        value={title} onChange={(e)=>setTitle(e.target.value)} 
                        className='common-input' style={{width:"200px"}}
                        placeholder='Enter Title' />
                              )   :
                              (
                                <h1 className='text-2xl font-bold'>{pin.title}</h1>
                              )
                      }

                      {/* button to edit */}
                    {
                        pin.owner && pin.owner._id === user._id && (
                          <button onClick={editHandler}><FaRegEdit /> Edit</button>
                    )}

                  {pin.owner && user?. _id === pin.owner._id && (
                    <button className="bg-red-500 text-white py-1 px-3 rounded">
                      <MdDelete />
                    </button>
                  )}
                </div>

                <p className="mb-6">{pin.pin}</p>
                  {/* owner id */}
                {pin.owner && (
                  <div className="flex items-center justify-between border-b pb-4 mb-4">
                    <div className="flex items-center">
                      <Link to={`/user/${pin.owner._id}`}>
                        <div className="rounded-full h-12 w-12 bg-gray-300 flex items-center justify-center">
                          <span className="font-bold">
                            {pin.owner.name.slice(0, 1)}
                          </span>
                        </div>
                      </Link>
                        {/* followers */}
                      <div className="ml-4">
                        <h2 className="text-lg font-semibold">{pin.owner.name}</h2>
                        <p className="text-gray-500">{pin.owner.followers.length} Followers</p>
                      </div>
                    </div>
                  </div>
                )}

            {/* comments */}
                <div className='flex items-center mt-4'>
                  <div className='rounded-full h-12 w-12 bg-gray-300 flex
                  items-center justify-center mr-4'>
                      <span className='font-bold'>{pin.owner && pin.owner.name.slice(0,1)}</span>
                  </div>

                  <form className='flex-1 flex'>
                    <input type="text"
                      placeholder='Enter the comment'
                    className='flex-1 border rounded-lg p-2'
                      required=""
                    />
                    <button type='submit ' className='ml-2 bg-red-500 px-4 py-2 rounded-md text-white'>Add+</button>
                  </form>
                </div>

              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PinPage;
