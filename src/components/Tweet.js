import { dbService } from 'fbInstance'
import React, { useState, useEffect } from 'react'

function Tweet({ tweetObj, isOwner }) {

    const [editing, setEditing] = useState(false)       // in edit mode?
    const [newTweet, setNewTweet] = useState(tweetObj.text)

    // DELETE
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure?")
        if (ok) {
            // delete tweet
            await dbService.doc(`Tweets/${tweetObj.id}`).delete()
        }
    }

    const toggleEditing = () => setEditing(prev => !prev)

    const onChange = (event) => {
        setNewTweet(event.currentTarget.value)
    }

    // UPDATE
    const onSubmit = async (event) => {
        event.preventDefault()
        await dbService.doc(`Tweets/${tweetObj.id}`).update({
            text: newTweet,
        })
        setEditing(false)
    }

    console.log(isOwner)
    return (
        <div>
            {
                editing ? (
                    <>
                        <form onSubmit={onSubmit}>
                            <input
                                type="text"
                                // value={tweetObj.text}
                                placeholder="New Tweet?"
                                required
                                onChange={onChange}
                            />
                            <input type="submit" value="Update Tweet" />
                        </form>
                        <button onClick={toggleEditing}>Cancel</button>
                    </>)
                    :
                    <>
                        <h4>{tweetObj.text}</h4>
                        {isOwner && <>
                            <button onClick={onDeleteClick}>Delete Tweet</button>
                            <button onClick={toggleEditing}>Edit Tweet</button>
                        </>
                        }
                    </>
            }

        </div>
    )
}

export default Tweet
