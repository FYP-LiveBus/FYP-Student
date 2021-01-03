import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text, FlatList} from 'react-native';
import axios from 'axios'

const SettingsScreen = ({navigation}) => {

  const [user, setUser] = useState({})
  const [trips, setTrips] = useState([])
  const [loader, setloader] = useState(false)

  useEffect(()=>{
    setloader(true)
    axios.get(`https://livebusapi.herokuapp.com/api/student/trips`)
    .then(response=>{
      console.log(response.data)
     
      setTrips(response.data)
    })
    .catch(err=>{  
      alert(err+" In catch")
    }) 
    setloader(false)
  },[])

  console.log("Trips here" + JSON.stringify(trips))
  return (
    <View>
      <Text style={styles.title}>Trips history details</Text>
      {loader===true?(
        <Text>Loading.......</Text>
      ):(
      <FlatList
        data={trips}
        keyExtractor={(item)=>item._id}
        renderItem={({item}) =>(
          <View style={styles.container}>
          <Text>Username: {item.stdUsername}</Text>
          <Text>email: {item.email}</Text>
          <Text>Route no: {item.routeNo}</Text>
          <Text>Stop: {item.stopName}</Text>
          <Text>Date: {item.date}</Text>  
          </View>
        )}
        />

      // <View>
      //   {trips.map(trip=>(
      //     <Text key={trip._id}> student name : {trip.}</Text>
      //   ))}
      // </View>
        )}
      
      {console.log("these are trips==>",trips)}
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    padding: "2%",
    margin: "2%",
    borderColor: "grey",
    // borderWidth: 0.5,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "white",
  },
  title:{
    textAlign: "center",
    margin: "3%",
    fontWeight: "bold",
    fontSize: 18
  }
});