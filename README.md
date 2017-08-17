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
var bigparser = require('bigparser')
```

**Available Methods:**
* login() - To login into BigParser account and get authId for all requests
* getHeader() - To get structure of specified grid
* getRows() - To fetch rows from the specified grid.
* getLastRow() - To get the last row or number of specified rows from the bottom


---

## How to Fetch Data?

Fetching Data from BigParser involves 3 simple steps

**1**.Login into your BigParser account.

**2**.Create an Object for the grid from which you wish to fetch data

**3**.Perform operation  the object to fetch data.


### Step 1:
In order to fetch data the user should first login into BigParser account using the *login()* method

#### Example
```java
import bigparser.Auth;
import bigparser.Grid;

String authId = Auth.login("emailId", "password");
```
authId has to be passed in whenever a grid Object is created 
### Step 2:

Create a object for the grid from which you wish to fetch data.

```java
import bigparser.Auth;
import bigparser.Grid;


String gridId = "57a34c80e4b017cc76c37c25";

String authId = Auth.login("emailId", "password");

Grid movies = new Grid(authId, gridId);

```

The gridId from which you wish to fetch the data must be specified by the user. *[Here gridId of the "Movie Beta" grid has been used]*  
### Step 3:
```java
import bigparser.Auth;
import bigparser.Grid;


String gridId = "57a34c80e4b017cc76c37c25";

String authId = Auth.login("emailId", "password");

Grid movies = new Grid(authId, gridId);

List<String> result = new ArrayList<String>();
    
// Build search filter
Map<String, String> searchfilter = new HashMap<String, String>();
searchfilter.put("GLOBAL", "x-men");
searchfilter.put("year", "2000,2016");
searchfilter.put("language ", "English");

//Build Sort 
Map<String, String> sort = new HashMap<String, String>();
sort.put("filmname ", "ASC");
sort.put("year", "DSC");


//columns to be displayed 
String columns = "film name ,year";


result = movies.getRows(20,searchfilter, sort, columns);
System.out.println(result);
```
**Sample Output**

*returns a list of rows.*

```java
[
  ["X-Men: Apocalypse","2016"],
  ["Ex-Men ","2016"],
  ["X-Men","2000"]
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

```java
const Grid = require('bigparser')
var movies = new Grid("arjun.bka@gmail.com", "AjayArjun", '57a34c80e4b017cc76c37c25', function () {
    movies.getHeaders(function(rows){ console.log(rows);})
    movies.getLastRow({'rowCount': '2', 'search': {"IteM NaMe": ["Bar"]},"columns":["film Name ","year"]}, function(rows){ console.log(rows);})
    movies.getRows({'rowCount': '50', 'search': {global: ["X-men","x-men 2"]}, columns:["film Name ","year"]}, function(rows){ console.log(rows);})
});

```
___

