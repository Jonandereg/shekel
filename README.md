# Shekel
 
Shekel is an app to request candlesticks PDF report on real crypto market data and its mainly composed of a client that can request and downloads pdf reports and an API hosted on an express server to get the desired crypto market data and generate a PDF for the client, an architecture  overview can be found below.

By the way if you are wondering about the name Shekel is because shekel is the first currency that we know of, used in ancient Mesopotamia

![image](https://user-images.githubusercontent.com/61870567/223076963-a82b784d-2603-45de-8a94-da1e0e4ef6f5.png)


## Timeframe and other considerations
Due to my current role and personal situation the time I had for this project was limited, this project was done exclusively over the weekend
with a split on Saturday of 70% Research- 30% developing and Sunday 80% developing - 20% research. I estimate including research time this whole project might have take me around 16 to 20 hours. 
main reason for that is that I was unfamiliar with the following topics as you will probably notice in the code:
- how to handle long standing requests
- how to use a message queue
- how to use a socket
- How to generate a Chart server side
Among others but those were the most challenging for me.

Currently the candlestick pdf does not looks like a candlestick because I ran out of time to understand how to properly draw the chart with the data I had



## Architecture 
The idea was for the service to handle long lasting request as generating a PDF can be a intensive task we have risk of timing out on our requests 
Below you can find a overview of the architecture used here - architecture is not currently in my domain so pardon the mess :) 
![image](https://user-images.githubusercontent.com/61870567/223066624-7d3e5689-8c22-47a3-b40d-d72bfe92bf41.png)

Steps:
1) Client sends a request for a report to the server
2) The server puts this requests in a Queue 
3) Then the server responds to the client that the request has been accepted - the client then is free to do other operations as this HTTP request is finished
4) A worker in the queue takes the request
5)The worker calls the Binance Api with a request for candlestick data
6)The worker receives the data from Binance
7)The worker then calls plotly API to generate a candlestick chart
8)We then fetch that chart as an Image and feed it to jsPDF to generate a PDF
9)We use socket.io to emit the PDF stream
10)Socket pushes the PDF stream into the client where a download is triggered

## Tech stack:
Client:
* created with NextJs a ReactJS framework -use due to familiarity 
* Axios for HTTP requests, I find it more convenient
* Chakra-UI which is a CSS-in-JS library  similar to emotion/styled-components 
* socket.io client for socket communication (as the name says on the client)
API:
* ExpressJs was used to create the server - due to familiarity as well
* RabbitMQ was used as the Message Queue provider 
* Axios for Http requests
* Binance API as it was well known and free, and did not required the use of an API key 
* Plotly as it had a node wrapper as most charting libraries are designed to work in a browser enviroment
* jsPDF to generate the PDF 


## Things to Improve 
* Testing, will definetely add testing, for now the focus was on making the full cycle work with the limited time
* Error handling and visibility using a service like Sentry as opposed to console.logs everywhere
* Improve Msg Queue pattern currently only one worker handles the queue 
* Related to the above find a way to run the queue on the cloud and not in Docker
* Improve stability of socket connection between client and server
* Prettify client app 
* Make actual candlestick chart in the PDF
* expand on the number of options the client could request from the report like adding more cryptos
* test in other browsers
* prettify chart
* remove hard coded values for Plotly Image URL 


## How to run this project 

In order to run this project docker and Node >= 16 are required
To run the client:
1. open new terminal
2. cd  to shekel/client
3. run `npm install`
4. run `npm run dev`
5. open [http://localhost:3000](http://localhost:3000) in your browser (tested in Chrome) 

to run the server:

1.in the root server folder create an .env file with the variables shared with you through a different channel 
2.open a new terminal 
3. cd shekel/server
4 run `npm install`
5. run `npm run rabbit` 
6. open another terminal
7.cd server
8. run `npm run start`




