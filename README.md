# **EduGraphIQ: AI-Powered Holistic Learning Platform**  
*A Knowledge Graph-Driven System for Cross-Subject Concept Mapping & Intelligent Learning*  

## **📌 Overview**  
**EduGraphIQ** is an AI-powered learning platform that leverages **Neo4j-based knowledge graphs** and **Graph RAG (Retrieval-Augmented Generation)** to create an interconnected understanding of syllabus concepts across multiple subjects. By structuring educational content into a **semantic knowledge graph**, the system enables:  
- **Holistic Learning**: Identifies relationships between concepts from different subjects (e.g., how "diffusion" applies in both biology and chemistry).  
- **Conversational AI**: Uses **LangChain** for dynamic Q&A, allowing students to explore linked concepts naturally.  
- **Smart Retrieval**: Enhances search accuracy with **Graph RAG**, retrieving contextually relevant explanations from the knowledge graph.  

## **🖼️ Knowledge Graph**  
![screenshot](img/image.png)

## **🔍 Example Query: Explaining the Human Respiratory System**  
Below is a sample interaction demonstrating how EduGraphIQ retrieves and connects concepts from the knowledge graph:  
### 📚 Identified Concepts:

• Nose and Mouth
  The primary entrance points for air into the lungs, responsible for warming, humidifying, and filtering the air.

• Pharynx
  A muscular tube that serves as a common passage for both food and air, directing air into the larynx.

• Larynx
  A cartilaginous structure containing the vocal cords, responsible for producing sound and preventing food from entering the lungs.

• Trachea
  A tube that divides into two primary bronchi, one for each lung, responsible for conducting air into the lungs.

• Bronchi and Bronchioles
  A network of tubes that branch into smaller airways, eventually leading to the alveoli where gas exchange occurs.

• Alveoli
  Tiny sacs where oxygen diffuses into the blood and carbon dioxide is removed, facilitating gas exchange.

• Diaphragm
  A dome-shaped muscle that separates the chest cavity from the abdominal cavity, responsible for expanding the lungs during inhalation.

• Intercostal Muscles
  Muscles between the ribs that contract and relax to facilitate breathing, expanding and compressing the chest cavity.

• Respiratory Control Center
  A region in the brainstem that regulates breathing rate and depth, responding to changes in CO2 levels and oxygen saturation.

### 🔍 Graph Relationships Discovered:
├─ respiratory system 
│  ├─ Relation: Have A Well Developed Respiratory System For Gas Exchange
│  ├─ Connected to: animals
│  └─ Chunk ID: 9bf2790264964e82a4d33614b4fd600c
╰───────────────────────────────

├─ respiratory system 
│  ├─ Relation: Comprising Two Lungs And Associated Air Passages
│  ├─ Connected to: lungs
│  └─ Chunk ID: 9bf2790264964e82a4d33614b4fd600c
╰───────────────────────────────

├─ respiratory system 
│  ├─ Relation: The Alveolar Region Is The Only Part Of The Respiratory System Where Diffusion Of Gases Occurs.
│  ├─ Connected to: alveolar region
│  └─ Chunk ID: 45f8e8e65ee6455eb5b0d8e34a084090
╰───────────────────────────────



https://github.com/user-attachments/assets/3396d2a1-744e-4429-bb48-e118817fb299



### 🔖 Retrieved Document Context:
The human respiratory system is a well-developed system comprising two lungs and associated air passages. Its primary function is to transport oxygen to the cells and remove carbon dioxide from the body. The process of respiration involves several steps, including breathing, exchange of gases, and transportation of gases throughout the body. 

Breathing, which includes inspiration and expiration, is carried out by creating pressure gradients between the atmosphere and the alveoli with the help of specialized muscles, such as the intercostals and diaphragm. The exchange of oxygen and carbon dioxide between the deoxygenated blood and alveoli, as well as between the oxygenated blood and tissues, occurs through diffusion. 

The rate of diffusion depends on the partial pressure gradients of oxygen and carbon dioxide, their solubility, and the thickness of the diffusion surface. In the human body, these factors facilitate the diffusion of oxygen from the alveoli to the deoxygenated blood and the removal of carbon dioxide from the blood to the alveoli, where it is exhaled out of the body. 

The respiratory system plays a crucial role in maintaining the overall health and function of the body by providing oxygen for cellular metabolism and removing harmful waste products, such as carbon dioxide.

### 💡 Final Answer:


Response: The human respiratory system is a well-developed system comprising two lungs and associated air passages. Its primary function is to transport oxygen to the cells and remove carbon dioxide from the body. The process of respiration involves several steps, including breathing, exchange of gases, and transportation of gases throughout the body.

The respiratory system is connected to animals and has a well-developed system for gas exchange. It comprises two lungs and associated air passages, and the alveolar region is the only part of the respiratory system where diffusion of gases occurs.

The process of respiration involves breathing, which includes inspiration and expiration, carried out by creating pressure gradients between the atmosphere and the alveoli with the help of specialized muscles, such as the intercostals and diaphragm. The exchange of oxygen and carbon dioxide between the deoxygenated blood and alveoli, as well as between the oxygenated blood and tissues, occurs through diffusion.

The rate of diffusion depends on the partial pressure gradients of oxygen and carbon dioxide, their solubility, and the thickness of the diffusion surface. In the human body, these factors facilitate the diffusion of oxygen from the alveoli to the deoxygenated blood and the removal of carbon dioxide from the blood to the alveoli, where it is exhaled out of the body.

The respiratory system plays a crucial role in maintaining the overall health and function of the body by providing oxygen for cellular metabolism and removing harmful waste products, such as carbon dioxide. Overall, the human respiratory system is a complex and essential system that enables the body to obtain the oxygen it needs to function properly.
