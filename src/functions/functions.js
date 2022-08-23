import axios from 'axios'


  let functions ={
    async  getCities() {
        let {
            data
        } = await axios.get('http://localhost:3000/cities');
        let cities = data;
        return cities
    
    },
     async  getCandidates() {
        let {
            data
        } = await axios.get('http://localhost:3000/candidates');
        let candidates = data;
        return candidates
    
    },
     async  getElections() {
        let {
            data
        } = await axios.get('http://localhost:3000/election');
        let elections = data;
        return elections
    },
    
     async  getAllVotingPopulation(cityId) {
        let allCities = await this.getCities();
        let city = allCities.filter(c => c.id === cityId);
        let initialValue = 0;
        const allVotingPopulation = city.reduce((current, prev) => current + prev.votingPopulation, initialValue);
        
        return allVotingPopulation;
    },
    
     async  getAllAbsences(cityId) {
        let allCities = await this.getCities();
        let city = allCities.filter(c => c.id === cityId);
        let initialValue = 0;
        const allAbsences = city.reduce((current, prev) => current + prev.absence, initialValue);
        return allAbsences;
    
    },
    
     async  getAllPresences(cityId) {
        let allCities = await this.getCities();
        let city = allCities.filter(c => c.id === cityId);
        let initialValue = 0;
        const allPresences = city.reduce((current, prev) => current + prev.presence, initialValue);
        return allPresences;
    },
    
     async getVotesPerCity(cityId) {
        let candidates = await this.getCandidates();
        let elections = await this.getElections();
        let cityElection = elections.filter(item => item.cityId === cityId);
        let cityPresence = await this.getAllPresences(cityId);
  
    
        let orderedCityElection = cityElection.sort((a,b)=> b.votes - a.votes);
    
        orderedCityElection.map((cityElection,i) =>{
            candidates.map(candidate =>{
                if(candidate.id === cityElection.candidateId){
                    orderedCityElection[i] = {...orderedCityElection[i], 
                        candidateName: candidate.name,
                        percentage: ((orderedCityElection[i].votes/cityPresence) * 100).toFixed(2),
                        elected:false
                        
                    }
                }
                if(orderedCityElection[0]){
                    orderedCityElection[0].elected = true
                }
            });
        }); 
    
        return orderedCityElection
    }
} 

export default functions