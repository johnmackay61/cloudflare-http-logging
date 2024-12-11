# cloudflare-http-logging
How to create a Cloudflare Worker to log HTTP page requests to R2 for analysis
#### How It Works:
- When a client accesses a URL like https://YOURDOMAIN.net/page, the Worker logs the request details to R2.
- After logging, the Worker fetches the original URL (request) and returns the response as if no Worker was involved. This setup ensures the client is seamlessly directed to their intended destination while logging the data.
#### Step 1: Prepare Cloudflare R2
##### Set up R2 bucket:

1. Log in to your Cloudflare dashboard.
	- Add **R2** to your account
  - Go to **R2** under the **Storage** section
	- Create a new bucket (e.g., http-requests-YOURDOMAIN).
2. Generate an R2 API Token:
	- Go to the **API Tokens** page in your Cloudflare dashboard.
	- Create a new API token with **R2 Storage - Edit** permissions for the specific bucket.
#### Step 2: Install and deploy the Cloudflare [worker.js](worker.js) file

The [worker.js](worker.js) script will extract the required fields from the HTTP requests, write them to the R2 bucket and direct the client to the requested URL.

#### Step 3: Deploy the Worker

1. Go to **Workers** in the Cloudflare dashboard.
2. Create a new Worker and paste the [worker.js](worker.js) script.
3. Bind the R2 bucket to the Worker: 
	- In the Worker settings, add an **R2 binding**.
	- Name the binding (e.g., R2_BUCKET).
	- Select the bucket you created earlier (http-requests-YOURDOMAIN).
4. Assign the Worker to your domain:
	- Go to **Workers Routes**, configure the Worker to run on \*.YOURDOMAIN.tld/*

#### Step 4: Test the Setup

1. Visit your domain (https://johnmackay.net) or make HTTP requests to it.
2. Check the R2 bucket:
	- Go to the **R2** section in your Cloudflare dashboard.
	- Look for the newly created log files.

#### Key Features:
1. Preserving Client Behavior:
	- The fetch(request) call ensures the client gets the exact response they would normally receive when making the request (e.g., loading the requested page). This way, the Worker logs the data but doesn’t interfere with the client’s browsing experience.
2. Minimal Output:
	- The client will see no additional messages or responses from the Worker—it functions transparently.



