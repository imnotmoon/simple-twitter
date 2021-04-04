import React, { useState, useEffect, useContext } from 'react'
import { authService, dbService, storageService } from '../fbInstance'
import Tweet from '../components/Tweet'
import { v4 as uuidv4 } from 'uuid'

function Home({ userObj }) {

    const [tweet, setTweet] = useState("")
    const [tweets, setTweets] = useState([])
    const [attachment, setAttachment] = useState()

    // READ
    useEffect(() => {
        // 데이터베이스의 변화를 감지해서 realtime이 가능하도록 함
        dbService.collection("Tweets").onSnapshot(snapshot => {
            const tweetsArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            console.log(tweetsArray)
            setTweets(tweetsArray)
        })
    }, [])


    // CREATE
    const onSubmit = async (event) => {
        event.preventDefault()
        let attachmentUrl = ""
        // upload image
        if (attachment !== "") {
            const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`)
            const response = await fileRef.putString(attachment, "data_url")
            attachmentUrl = await response.ref.getDownloadURL()
        }
        // create data
        await dbService.collection("Tweets").add({
            text: tweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl
        })
        setTweet("")
        setAttachment()
    }

    const onChange = (event) => {
        const { target: { value } } = event
        setTweet(value)
    }

    const onFileChange = (event) => {
        const { target: { files } } = event;
        const theFile = files[0];
        const reader = new FileReader()
        reader.onloadend = (finishedEvent) => {
            const { currentTarget: { result } } = finishedEvent;
            setAttachment(result)
        }
        reader.readAsDataURL(theFile)
    }

    const onClearAttachmentClick = () => setAttachment(null)

    return (
        // <UserContext.Consumer>
        // {value => (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120}
                    value={tweet}
                    onChange={onChange}
                />
                <input type="file" accept="image/*" onChange={onFileChange} />
                <input type="submit" name="" value="Tweet" />
                {attachment &&
                    <div>
                        <img src={attachment} alt="" width="50px" height="50px" />
                        <button onClick={onClearAttachmentClick}>Clear</button>
                    </div>}
            </form>
            <div>
                {tweets.map(item => (
                    <Tweet
                        key={item.id}
                        tweetObj={item}
                        isOwner={item.creatorId === userObj.uid}
                    />
                ))}
            </div>
        </div>
        //     )}
        // </UserContext.Consumer>
    )
}

export default Home