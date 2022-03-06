# Why I built this

I got sick of asking people for their wallet addresses, then confirming they still use those addresses. I made this so people can publicly associate other known identities (email, Github, LinkedIn, etc.) with their wallets.

## Stack
This project uses:
* Dgraph
* Next.js
* Firebase v9 (for auth and verifying linked accounts)
* [web3react](https://github.com/NoahZinsmeister/web3-react)
* Tailwind.css


## Getting Started

You can spin up the project using Docker. You will need to set up [Firebase Emulator](https://firebase.google.com/docs/emulator-suite) to handle authentication locally. 

```
# run
yarn up
# fresh install, but keeping DB
yarn new
# fresh install, fresh DB
yarn fresh
# Update the dgraph schema
yarn schema 
# Sometimes this fails to show errors with the schema update, in which case
 curl -X POST localhost:8080/admin/schema --data-binary '@dgraph/schema.graphql'
# re-generate types
yarn generate
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Note
* The user logs in by signing a nonce with their wallet and receiving a JWT. They are allowed to then change which wallet they are using (in MetaMask, for example) without logging out. 
* You can find the code for Firebase in the `/functions` folder.

## Areas that require improvement

**Authentication & account verification**: 
* I currently verify wallet and email addresses using Firebase. The frontend then submits the associated date to the backend. It would probably be more secure to have Firebase update the backend directly in this case.
* It would be great to use something more decentralized than Firebase.

**Documentation**: 
This is a prototype, not an open-source project, so I haven't put that much time into document it. Better documentation would be helpful, however.