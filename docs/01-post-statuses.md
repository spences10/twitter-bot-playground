# Post Statuses

Firstly post statuses, with `.post('statuses/update'...` bot will post a hello world! status.

```javascript
bot.post('statuses/update', {
  status: 'hello world!'
}, (err, data, response) => {
  if (err) {
    console.log(err)
  } else {
    console.log(`${data.text} tweeted!`)
  }
})
```

[Previous: Set up the bot.](00-set-up-the-bot.md#set-up-the-bot)

[Next: Work with Users.](02-work-with-users.md#work-with-users)
