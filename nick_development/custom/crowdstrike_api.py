import os
# import click
# import colorama
from falconpy import (
    CloudConnectAWS,
    Detects,
    Hosts,
    IOC,
    Incidents,
    Intel,
    OAuth2
)

#Gets the client id and secret from a HIDDEN file
with open("Downloads/farmers.txt", 'r') as r_txt:
    df = r_txt.read()
df = df.split()
ci = df[2]
cs = df[4]

#Function to get the os path to a enviromental variable so that the file path is not in the code file so that the 
#Is going to return none because the ci and cs enviromental variables are not set// need admin perms for that but should probably be in final implementation 
# falcon_client_id = os.getenv("ci")
# falcon_client_secret = os.getenv("cs")


falcon_client_id = ci 
falcon_client_secret = cs 


auth = OAuth2(
        client_id=falcon_client_id,
        client_secret=falcon_client_secret
        )
    # Generate a token// specifically we want auth.taken_value
auth.token()
print(auth.token_status)
if auth.token_status != 201:
    raise SystemExit("Unable to authenticate.")

#Testing to see what api classes I have access to
test_instance = Hosts(access_token= auth.token_value)
if isinstance(test_instance, Hosts):
    if test_instance.query_devices()["status_code"] == 200:
        print("Passed Hosts")
    else:
        print("Failure of Hosts")

#testing to see if I have access to the detections data
test_instance = Detects(access_token= auth.token_value)
if isinstance(test_instance, Detects):
    if test_instance.query_detects()["status_code"] == 200:
        print("Passed Detctions")
    else:
        print("Failure of Detections")

#Gets a response containing a bunch of bs and then seperates the ids out from that dictionary and turns it into a list
response = test_instance.query_detects()
body = response["body"]
id_ls = body["resources"]
print("\n")

for id in id_ls:
    print(test_instance.get_detect_summaries(ids = id))
    print("\n")
# resp2 = test_instance.get_detect_summaries(ids = id_ls)
# print(resp2)

"""
falcon = Detects(client_id="pan", client_secret="hitty")
data_range = {
    "from": "string"
    "to": "string"
}

search_range = {
    "From": integer,
    "To": integer
}

response = falcon.get_aggregate_detects(date_ranges=[date_range],
                                        exclude="string",
                                        field="string",
                                        filter="string",
                                        from=integer,
                                        include="string",
                                        interval="string",
                                        max_doc_count=integer,
                                        min_doc_count=integer,
                                        missing="string",
                                        name="string",
                                        q="string",
                                        ranges=[search_range],
                                        size=integer,
                                        sort="string",
                                        time_zone="string",
                                        type="string"
                                        )
print(response)
file1 = open("Crowdstrike.data.txt" , "w")
"""