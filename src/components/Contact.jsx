import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';
import './Contact.css';
import Note from './Note';

function Contact() {

  const [state, dispatch] = useContext(UserContext);
  const [scomp, setScomp] = useState(false);
  const [buttonText, setbuttonText] = useState('Add Note');
  const [searchButtonText, setsearchButtonText] = useState('Search Note');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const [searchedData, setsearchedData] = useState({data : []});
  const [note, setNote] = useState({ user: '', title: '', tags: '', note: '' });

  const [mynotes, setMynotes] = useState({});
  const [id, setId] = useState('');
  const [isuser, setIsuser] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote(prevState => ({
      ...prevState,
      [name]: value
    }));

  };

  const getUserNotes = () => {
    fetch('/getnotes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: id })
    }).then((res) => {
      if (res.status !== 200) {
        throw new Error(`Error Occurred ${res.status}`);
      }
      return res.json();
    }).then((data) => {
      setMynotes(data);
      setIsuser(true);
    })
      .catch((err) => { console.error('Failed to send Data', err); });
  }

  const authUser = async () => {
    try {
      const res = await fetch('/contact', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
      const data = await res.json();
      setId(data._id);
      setNote({
        user: data._id,
        title: '',
        tags: '',
        note: ''
      });
      if (!res.status === 200) {
        throw new Error(res.error);
      }
      getUserNotes();
      dispatch({ type: 'USER', payload: true });
    } catch (error) {
      navigate('/authuser');
    }
  };

  const handleDelete = async (_id) => {
    const formData = {
      user : id,
      noteid : _id
    }
    try {
      const res = await fetch('/delete', {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(formData)
      });
      if(res.status !== 200) throw new Error(`Error : ${res}`);
      const data = await res.json();
      if(data.acknowledged) {
        getUserNotes();
        alert('Deleted Succesfully');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleClick = (e) => {
    setbuttonText('Adding...');
    e.preventDefault();
    fetch('/addnote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note)
    }).then((res) => {
      return res.json();
    }).then((data) => {
      alert(data.message);
      setNote({
        user: id,
        title: '',
        tags: '',
        note: ''
      });
      getUserNotes();
      setbuttonText('Add Note');
    })
      .catch((err) => { console.error('Failed to send Data', err); });
  }

  const handleSearchClick = (e) => {
    e.preventDefault();
    setsearchButtonText('Searching...');
    fetch('/searchnote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: id, tags: search })
    }).then((res) => {
      if(res.status === 421){
        setsearchButtonText('Search Note');
        throw new Error('No Tag Added.');
      }
      return res.json();
    }).then((data) => {
      setSearch('');
      setsearchedData(data);
      setsearchButtonText('Search Note');
      alert('Searched');
    }).catch((err) => {
      alert(err);
      console.log('Failed to send Data', err);
    });
  }

  const getNotes = (e) => {
    e.preventDefault();
    getUserNotes();
    alert('Refreshed !!!');
  }

  useEffect(() => {
    authUser();
  }, []);

  return (
    <div >
      {
        !scomp
          ?
          <>
            <div className='contact-container'>
              <form method='POST' className='contact-form'>
                <input autoComplete='off' className='contact-input' type='text' onChange={handleChange} name='title' value={note.title} placeholder='Title' />
                <input autoComplete='off' className='contact-input' type='text' onChange={handleChange} name='tags' value={note.tags} placeholder='Add Tags Comma Seperated...' />
                <textarea className='contact-input' onChange={handleChange} name='note' value={note.note} placeholder='Enter Your Note...' />
                <div className='contact-btns-container'>
                  <button className='contact-btn' onClick={handleClick} >{buttonText}</button>
                  <button className='contact-btn' onClick={(e) => {e.preventDefault(); setScomp(true); }} ><i className="fa fa-search" aria-hidden="true"></i>  Note</button>
                </div>
              </form>
            </div>
          </>
          :
          <>
            <div className='contact-container'>
              <form method='POST' className='contact-form'>
                <input autoComplete='off' className='contact-input' type='text' onChange={(e) => { setSearch(e.target.value); }} name='tags' value={search} placeholder='Search By Tags Comma Seperated...' />
                <div className='contact-btns-container'>
                  <button className='contact-btn' onClick={handleSearchClick} >{searchButtonText}</button>
                  <button className='contact-btn' onClick={(e) => { e.preventDefault(); setScomp(false); }} ><i className="fa fa-plus" aria-hidden="true"></i> Add Note</button>
                </div>
              </form>
            </div>
          </>

      }
      <button className='btn-pos' onClick={getNotes} ><i className="fa fa-refresh"></i></button>
      <div className='contact-table'>
        {
          isuser
            ?
            <>
              <div className='grid'>
                  {
                    scomp
                      ?
                      searchedData.data.map(element => {
                        return (
                          <div className='note-box' key={element._id}>
                            <Note note={element} />
                          </div>
                        );
                      })
                      :
                      mynotes.notes.map((e) => {
                        return (
                          <div className='note-box' key={e._id}>
                            <button className='contact-btn' 
                                onClick={(event) => {
                                  event.preventDefault();
                                  handleDelete(e._id);
                                }} 
                              >Delete</button>
                            <Note note={e} />
                          </div>
                        );
                      })
                  }
              </div>
            </>
            :
            <h1> # Add Your First Note # </h1>
        }
      </div>
    </div>
  )
}

export default Contact;