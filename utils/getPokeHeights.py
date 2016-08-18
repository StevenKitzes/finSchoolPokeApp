import json, requests, os, sys

outputFileName = '../pokemonList.json'

with open(outputFileName, "w") as outFile:
    outFile.write("[")
    for targetId in range(1, 152):
        endpoint = "http://pokeapi.co/api/v2/pokemon/" + str(targetId) + "/"
        print('trying endpoint: ' + endpoint)
        r = requests.get(endpoint)
        data = json.loads(r.content)
        thisPoke = {}
        thisPoke['name'] = data['name']
        thisPoke['id'] = data['id'] #number!
        thisPoke['height'] = data['height'] #number!
        thisPoke['types'] = []
        for slot in data['types']:
            thisPoke['types'].append(slot['type']['name'])
        for stat in data['stats']:
            if not 'special' in stat['stat']['name']:
                thisPoke[stat['stat']['name']] = stat['base_stat']
        jsonOut = json.dumps(thisPoke)
        outFile.write(jsonOut)
        if targetId not 151:
            outFile.write(',')
        print('got pokemon!!')
        print(jsonOut)
    outFile.write("]")
