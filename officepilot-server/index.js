const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const port = process.env.PORT || 3000;

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  }),
);

app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.wukjrsy.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const generateToken = (user) => {};

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const db = client.db("ProjectManagement");
    const projectCollections = db.collection("projects");
    const userCollections = db.collection("users");

    // ======================================================================================================= //
    //============================================= COMMON ROUTES ============================================ //

    // TOKEN CREATE
    app.post("/createToken", async (req, res) => {
      const email = req.body.email;
      const query = { email: email };
      const user = await userCollections.findOne(query);

      const payload = {
        id: user._id,
        email: user.email,
        role: user.role,
        team: user.team,
        department: user.department,
        service: user.serviceType,
      };
      // console.log(payload);
      const token = await jwt.sign(payload, process.env.TOKEN_SECRETE_KEY, {
        expiresIn: "1d",
      });
      res.send({ token });
    });

    // TOKEN VERIFY
    const TokenVerify = (req, res, next) => {
      const tokenData = req?.headers?.authorization;
      // console.log("Token Received", authToken);

      if (!tokenData) {
        return res.status(401).send({ message: "Unauthorized access" });
      }

      const token = tokenData.split(" ")[1];

      jwt.verify(token, process.env.TOKEN_SECRETE_KEY, (err, decoded) => {
        if (err) {
          console.log("Token Verify Failed");
          return res.status(403).send({ message: "Forbidden Access" });
        }
        req.decoded = decoded;
        // console.log("Token Decode name set korech.", req?.decoded);
        next();
      });
    };

    // USER ROLE VERIFY
    const verifyRole = (allowedRoles) => {
      return async (req, res, next) => {
        const userEmail = req.decoded.email;
        console.log("verify role check", userEmail);
        const query = { email: userEmail };
        const user = await userCollections.findOne(query);

        console.log(
          "Role chek korchi ami akhon...",
          allowedRoles.includes(user.role),
        );

        if (!user || !allowedRoles.includes(user.role)) {
          return res
            .status(403)
            .send({ message: "আপনার এই কাজ করার অনুমতি নেই!" });
        }
        next();
      };
    };


    // find user
     app.get("/user", async (req, res) => {
      const userEmail = req.query.email;
      const email = { email: userEmail };
      const data = await userCollections.findOne(email);

      res.status(200).send({ status: "Successfull", data: data });
    });




    // ======================================================================================================= //
    //============================================= PUBLIC ROUTES ============================================ //

    // SIGN-UP or REGISTRATION
    app.post("/userCreate", async (req, res) => {
      const reqBody = req.body;
      const email = { email: reqBody.email };
      const isExits = await userCollections.findOne(email);

      if (isExits) {
        return res.send({ message: "User already existing", insertedId: null });
      }

      const userInfo = {
        name: reqBody.name,
        email: reqBody.email,
        password: reqBody.password,
        team: "Unassigned",
        serviceType: "Unassigned",
        department: "Unassigned",
        role: "guest",
        designation: "Wordrpess Developer",
        profile_pic: "https://i.pravatar.cc/150?img=2",
      };

      const result = await userCollections.insertOne(userInfo);
      res.status(200).send({ status: "Successfull", data: result });
    });



    // ======================================================================================================= //
    //============================================= ADMIN ROUTES ============================================ //

    //1. leader add
    //2. leader remove
    //3. Notice Apporve
    //4. Notice Reject
    

    // ======================================================================================================= //
    // =================================  ADMIN, LEADERS  ====================================== //
    
    //1. Employee add
    //2. Employee remove
    //3. Team leader add
    //4. Team leader remove
    //5. Member notice request feedback


    // ======================================================================================================= //
    //============================================= LEADER ROUTES ============================================ //


    //3. Notice add request
    //4. Notice remove request


    // ======================================================================================================= //
    //============================================= SALES-MAN ROUTES ============================================ //

    //1. add project 
    app.post("/add-project",TokenVerify,verifyRole(["admin", "leader", "salesman"]),
      async (req, res) => {
        const project = req.body;

        const projectData = {
          ...project,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const result = await projectCollections.insertOne(projectData);
        res.status(200).send({ status: "Successfull", data: result });
      },
    );

    //2. edit project 




    // ======================================================================================================= //
    // =================================  ADMIN, LEADERS, TEAM-LEADERS  ====================================== //

    // PROJECT ASSIGN
    app.patch("/assign-project/:id",TokenVerify,verifyRole(["admin", "leader", "team leader"]),
      async (req, res) => {
        const id = req.params.id;
        const reqBody = req.body;

        const query = { projectId: id };

        const AssignProject = {
          $set: {
            ...reqBody,
            updatedAt: new Date(),
          },
        };

        try {
          const project = await projectCollections.updateOne(
            query,
            AssignProject,
          );
          if (!project) {
            return res.status(404).send({ message: "Not found this project!" });
          }

          res.status(200).send({ Status: "Successfull", data: project });
        } catch (error) {
          console.error("Something is wrong:", error);
          res.status(404).send({ message: "Something is wrong:" });
        }
      },
    );




    // ======================================================================================================= //
    // =========================  ADMIN, LEADERS, TEAM-LEADERS, MEMBER ROUTES  =============================== //

    //1. ALL PROJECT
    app.get("/projects",TokenVerify,verifyRole(["admin", "leader", "team leader", "member"]),async (req, res) => {
        try {
          const userRole = req.decoded.role;
          const UserDepartment = req.decoded.department;
          const UserTeam = req.decoded.team;
          const UserEmail = req.decoded.email;

          console.log(UserEmail);
          let query = {};

          if (userRole === "admin") {
            query = {};
          } else if (userRole == "leader") {
            query = { department: UserDepartment };
          } else if (userRole == "team leader") {
            query = { team: UserTeam };
          } else if (userRole == "member") {
            query = { email: UserEmail };
          }

          const result = await projectCollections.find(query).toArray();

          if (!result) {
            return res.status(404).send({ message: "No projects found" });
          }

          res.status(200).send(result);
        } catch (error) {
          console.error("Something is wrong:", error);
          res.status(404).send({ message: "Something is wrong:" });
        }
      },
    );

    //2. PROJECT DETAILS
    app.get("/project/:id",TokenVerify,verifyRole(["admin", "leader", "team leader", "member"]),async (req, res) => {
        try {
          const id = req.params.id;

          if (!ObjectId.isValid(id)) {
            return res
              .status(400)
              .send({ message: "Invalid Project ID format" });
          }

          const query = { _id: new ObjectId(id) };
          const result = await projectCollections.findOne(query);

          if (!result) {
            return res.status(404).send({ message: "Project not found" });
          }

          res.status(200).send({ status: "Successfull", data: result });
        } catch (error) {
          console.error("Error:", error);
          res.status(404).send({ message: "Internal Server Error" });
        }
      },
    );

    //3. Project Update page
    app.patch("/update-project/:id",TokenVerify,verifyRole(["admin", "leader", "team leader", "member"]),async (req, res) => {
        try {
          const id = req.params.id;
          const updateData = req.body;

          // if (!ObjectId.isValid(id)) {
          //     return res.status(400).send({ message: "Invalid Project ID format" });
          // }

          const query = { _id: new ObjectId(id) };

          const updateDoc = {
            $set: {
              ...updateData,
              updatedAt: new Date(),
            },
          };

          const result = await projectCollections.updateOne(query, updateDoc, {
            upsert: true,
          });

          if (!result) {
            return res.status(404).send({ message: "Project not found" });
          }

          res.status(200).send({ status: "Update Successfull", data: result });
        } catch (error) {
          console.error("Error:", error);
          res.status(404).send({ message: "Internal Server Error" });
        }
      },
    );

    //4. Project Complete Request
    //5. Others


    // ======================================================================================================= //
    //============================================= MEMBER ROUTES ============================================ //

    //1. Employee add
    //2. Employee remove
    //3. Notice add request
    //4. Notice remove request

    // ======================================================================================================= //
    //============================================= MEMBER ROUTES ============================================ //

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server Running Successfull.");
});

app.listen(port, () => {
  console.log(`Server runnig port ${port}`);
});
