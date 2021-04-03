import React, { useState, useEffect, useContext } from 'react'
import { authService, dbService } from '../fbInstance'
import Tweet from '../components/Tweet'

function Home({ userObj }) {

    const [tweet, setTweet] = useState("")
    const [tweets, setTweets] = useState([])


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
        await dbService.collection("Tweets").add({
            text: tweet,
            createdAt: Date.now(),
            creatorId: userObj.uid
        })
        setTweet("")
    }

    const onChange = (event) => {
        const { target: { value } } = event
        setTweet(value)
    }

    return (
        // <UserContext.Consumer>
        // {value => (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="What's on your mind?"
                    max={120}
                    value={tweet}
                    onChange={onChange}
                />
                <input type="submit" name="" value="Tweet" />
            </form>
            <div>
                {tweets.map(item => (
                    <Tweet
                        key={item.id}
                        tweetObj={item}
                        isOwner={item.creatorId == userObj.uid}
                    />
                ))}
            </div>
        </div>
        //     )}
        // </UserContext.Consumer>
    )
}

export default Home
