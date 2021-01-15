// SPDX-License-Identifier: MIT
pragma solidity ^0.7.4;
pragma experimental ABIEncoderV2;

contract Election{
        struct Candidate{
            uint candidateID;
            string Name;
            string Email;
            uint VoteCount;
            string ElectionId;
        }
        
        
        Candidate[] public candidates;
        
         event getlist(uint[] candidateID, string[] name, string[] email, uint[] votes, string[] electionid);
        
        function addCandidates(uint _cid, string memory _name, string memory _mail, string memory _eid )public{
            candidates.push(Candidate(_cid, _name, _mail,0, _eid));
        }
        
        
        
        function getCandidate(string memory _id) payable public returns(uint[] memory, string[]memory, string[] memory, uint[] memory, string[] memory){
            uint count=0;
            
            for(uint i=0; i<candidates.length; i++){
              if((keccak256(abi.encodePacked((  candidates[i].ElectionId  ))) == keccak256(abi.encodePacked(( _id ))))){
                  count++;
              }
          }
          
               uint[] memory CandidateIdList= new uint[](count);
            string[] memory  NameList= new string[](count);
            string[] memory EmailList= new string[](count);
            uint[] memory VoteCountList= new uint[](count);
            string[] memory ElectionIdList=new string[](count);
          
          for(uint i=0; i<candidates.length; i++ ){
              if((keccak256(abi.encodePacked((  candidates[i].ElectionId  ))) == keccak256(abi.encodePacked(( _id ))))){
                  CandidateIdList[i]=candidates[i].candidateID;
                  NameList[i]=candidates[i].Name;
                  EmailList[i]=candidates[i].Email;
                  VoteCountList[i]=candidates[i].VoteCount;
                  ElectionIdList[i]=candidates[i].ElectionId;
              }
          }
           emit getlist(CandidateIdList, NameList, EmailList, VoteCountList, ElectionIdList);
          return (CandidateIdList, NameList, EmailList, VoteCountList, ElectionIdList);
        }
        
        
        function vote(uint _id) public{
            for(uint i=0; i< candidates.length; i++){
                 if((keccak256(abi.encodePacked((  candidates[i].candidateID  ))) == keccak256(abi.encodePacked(( _id ))))){
                     candidates[i].VoteCount= candidates[i].VoteCount+1;
                 }
            }
        }
      
}