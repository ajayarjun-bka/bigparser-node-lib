# Node JS library for BigParser

Node JS library for BigParser's API to fetch data from grids.


## How to Install the package?
To install bigparser just type the following command in terminal:

```python
$ npm install bigparser
```

## How to Import bigparser module into your code?

Add this statement

```javascript
const grid = require('bigparser')
```

**Available Methods:**
* login() - To login into BigParser account and get authId for all requests
* getHeader() - To get structure of specified grid
* getRows() - To fetch rows from the specified grid.
* getLastRow() - To get the last row or number of specified rows from the bottom


---

## How to Fetch Data?

Fetching Data from BigParser involves 2 simple steps

**1**.Login into your BigParser account.

**2**.Create an Object for the grid from which you wish to fetch data and pass in the operations you wish to perform on the grid into callback function. Refer the examples below.



### Step 1:
In order to fetch data the user should first login into BigParser account using the *login()* method

#### Example
```javascript
const Grid = require('bigparser')
var movies = new Grid("username", "password", 'gridId',function(){});

```
The empty function is supposed to perform tasks on grid after authentication.Please follow on the  next step to understand clearly

### Step 2:

Create a object for the grid from which you wish to fetch data.

```javascript
const Grid = require('bigparser')
var movies = new Grid("username", "password", 'gridId',function(){
    movies.getRows({'rowCount': '4', 'search': {global: ["X-men","x-men 2"]}, columns:["film Name ","year"]}, function(rows){ console.log(rows);});
    });

```

The gridId from which you wish to fetch the data must be specified by the user. *[Here gridId of the "Movie Beta" grid has been used]*  

**Sample Output**

*returns a list of rows.*

```javascript
[
  { data: [ 'X-Men: Apocalypse', '2016' ], successful: true },
  { data: [ 'Warcraft', '2016' ], successful: true },
  { data: [ 'Captain America: Civil War', '2016' ],
    successful: true },
  { data: [ 'The Do-Over', '2016' ], successful: true }
]
```
---
### Description of Available Auth methods:


### login
```java
 login(emailId,password,callback)
```
*Logs into a BigParser account and returns the authId*

**Parameters**

#### ***Required Parameters:***
 
   `emailId` - emailId/username of your account
   
   `password` - password to login into BigParser account
   
   `callback` - function contiaining tasks to be performed after login
   
---

### Description of Available Grid methods:


### getRows
```javascript
 getRows(data, callback)
```
*Fetches rows from the grid*

**Parameters**

`data` - comprises the options to query the grid in the form of JSON object.
   
`callback` - callback function to handle the response.
   
   ***List of allowed options in data parameter***
   
* `rowCount`  - *required* - No of rows to fetch. If value not provided then default is 10

* `search` - *optional* - JSON object containing global level and column level filters

  **sample format**

```javascript
   {
   'search':{
     GLOBAL: ["X-men"],
     year: ["2000", "2016"]}
   }
```
    
Anything that has to be searched on a global level should go in to the list under the key "GLOBAL". Terms which are to be searched within columns should be specified as key and value(s) where key is the column name and value(s) is the term(s) to be searched.

   `sort` - JSON object containing the columns to be sorted and their order 
   
  ```javascript
       {
       "sort":{"year": "ASC","film Name ": "DSC"}
       }
  ```
    
Here "year" is the column name and the value can be "ASC" for ascending order and "DSC" for descending order.
   
   `columns` - array of columns to be selected from the grid
   
```javascript
       {
       columns:["film Name ","year"]
      }  
  ```
---


### getHeaders
```javascript
 getHeaders(callback)
```
*Fetches headers of the specified grid*

**Parameters**

`callback` - callback function to handle the response.
   
---
### getLastRow
```javascript
 getLastRow(parameters,callback)
```
*Fetches rows from the grid*

**Parameters**

`data` - comprises the options to query the grid in the form of JSON object.
   
`callback` - callback function to handle the response.
   
   ***List of allowed options in data parameter***
   
* `rowCount`  - *required* - No of rows to fetch. If value not provided then default is 10

* `search` - *optional* - JSON object containing global level and column level filters

  **sample format**

```javascript
   {
   'search':{
     GLOBAL: ["X-men"],
     year: ["2000", "2016"]}
   }
```
    
Anything that has to be searched on a global level should go in to the list under the key "GLOBAL". Terms which are to be searched within columns should be specified as key and value(s) where key is the column name and value(s) is the term(s) to be searched.

   `sort` - JSON object containing the columns to be sorted and their order 
   
  ```javascript
       {
       "sort":{"year": "ASC","film Name ": "DSC"}
       }
  ```
    
Here "year" is the column name and the value can be "ASC" for ascending order and "DSC" for descending order.
   
   `columns` - array of columns to be selected from the grid
   
```javascript
       {
       columns:["film Name ","year"]
      }  
  ```
****

## Sample Code

*Replace emailId and password in the login function*

```javascript
const Grid = require('bigparser')
var movies = new Grid("username", "password", 'gridId',function(){
    
    movies.getHeaders(function(rows){ console.log(rows);});
   
    movies.getRows({'rowCount': '4', 'search': {GLOBAL: ["X-men","x-men 2"]}, columns:["film Name ","year"]}, function(rows){ console.log(rows);});
    
    movies.getLastRow({'rowCount': '2', 'search': {"Item Name": ["Bar"]},"columns":["film Name ","year"]}, function(rows){ console.log(rows);});
    
    });

```
___

