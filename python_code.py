import json
import requests
import xmltodict
import collections
from datetime import datetime
import time


from web3 import Web3, HTTPProvider, TestRPCProvider
from web3.contract import ConciseContract


web3 = Web3(Web3.HTTPProvider("https://ropsten.infura.io/Vr1GWcLG0XzcdrZHWMPu"))
account = '0x6814b126eEbeED353A8D9e1bDCaC422f6F0A339e';
privateKey = 'a3c0074742371bfbfa3b2ffae0cac027ab1dcecb49fa0c7ea34f640aa89b3dd4'
contractAddress = '0xd399399bc8bbc3a4f0ee6a72631fc4c671aeca40';
abi = [
    {
        "constant": False,
        "inputs": [
            {
                "name": "tagId",
                "type": "bytes32"
            },
            {
                "name": "place",
                "type": "bytes32[]"
            },
            {
                "name": "timeStamp",
                "type": "uint256[]"
            }
        ],
        "name": "set_data",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": False,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": True,
        "inputs": [
            {
                "name": "map_index",
                "type": "bytes32"
            }
        ],
        "name": "read_map",
        "outputs": [
            {
                "name": "",
                "type": "bytes32[]"
            },
            {
                "name": "",
                "type": "uint256[]"
            }
        ],
        "payable": False,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": True,
        "inputs": [],
        "name": "read_tagId",
        "outputs": [
            {
                "name": "",
                "type": "bytes32[]"
            }
        ],
        "payable": False,
        "stateMutability": "view",
        "type": "function"
    }
];


contract_instance = web3.eth.contract(address=web3.toChecksumAddress(contractAddress), abi=abi)

def APIWEB3():
    try:
            r = requests.get('http://18.220.207.133:8080/Fejlett/rest/DataService/getData')
            res = xmltodict.parse(r.text)['transactionDatas']['Transaction']

            obj = {}

            for item in res:
                if item['tagId'] in obj:
                    if item['location']+'__'+item['timestamp'] in obj[item['tagId']]:
                        pass;
                    else:
                        obj[item['tagId']].append(item['location']+'__'+item['timestamp'])
                else:
                    obj[item['tagId']] = []
                    obj[item['tagId']].append(item['location']+'__'+item['timestamp'])


            for model,group in obj.items():
                print (model,web3.toHex(text=str(model)))
                final_data = []
                contract_data = []
                location = []
                timestamp = []
                contract_data_arr = contract_instance.functions.read_map(web3.toHex(text=str(model))).call()

                for index,j in enumerate(contract_data_arr[0]):
                    contract_data.append(str(j.decode('utf8').strip()).replace('\x00','')+'__'+str(contract_data_arr[1][index]))

                for i,key in enumerate(group):
                    location_data = key.split('__')[0]
                    timestamp_data = int(time.mktime(datetime.strptime(key.split('__')[1],'%Y-%m-%d %H:%M:%S.%f').timetuple()))

                    if (((location_data+"__"+str(timestamp_data)) not in contract_data) and ((location_data+"__"+str(timestamp_data)) not in final_data)):
                        if len(final_data) < 100:
                            final_data.append(location_data+"__"+str(timestamp_data))
                for fi in final_data:
                    location.append(str(web3.toHex(text=fi.split("__")[0])))
                    timestamp.append(int(fi.split("__")[1]))
                nonce = web3.eth.getTransactionCount(web3.toChecksumAddress(account))
                if (len(location) > 0) and (len(timestamp)):
                    print (contract_instance.functions.set_data(web3.toHex(text=str(model)),location,timestamp).estimateGas())
                    transaction = contract_instance.functions.set_data(str(web3.toHex(text=(model))),list(location),list(timestamp)).buildTransaction({'gasPrice': 21000000000,'nonce':nonce})
                    signed = web3.eth.account.signTransaction(transaction, privateKey)
                    txHas = Web3.toHex((web3.eth.sendRawTransaction(signed.rawTransaction)))
                    print(txHas)
                    tx_receipt = web3.eth.getTransactionReceipt(txHas)
                    print(tx_receipt)
                    while (tx_receipt == None):
                        tx_receipt = web3.eth.getTransactionReceipt(txHas)
            return True;
    except Exception as e:
        print("Error Occured !!!")
        return False;

while APIWEB3():
    print("Fine !!!")