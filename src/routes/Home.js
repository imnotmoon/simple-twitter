import React, { useState, useEffect } from 'react'
import { authService, dbService } from '../fbInstance'

function Home() {

    const [tweet, setTweet] = useState("")
    const [tweets, setTweets] = useState([])

    const getTweets = async () => {
        const rows = await dbService.collection("Tweets").get()
        rows.forEach(document => {
            const tweetObject = {
                ...document.data(),
                id: document.id,
            }
            setTweets((prev) => [tweetObject, ...prev])
        })
        console.log(tweets)
    }

    useEffect(() => {
        getTweets()
    }, [])

    const onSubmit = async (event) => {
        event.preventDefault()
        await dbService.collection("Tweets").add({
            tweet,
            createdAt: Date.now(),
        })
        setTweet("")
    }

    const onChange = (event) => {
        const { target: { value } } = event
        setTweet(value)
    }

    return (
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
                    <div key={item.id}>
                        <h4>{item.tweet}</h4>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home
