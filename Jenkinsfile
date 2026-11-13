pipeline {

    agent any

    stages {

        stage('Clone GitHub Repository') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/vijayalakshmi778/jenkins-batch22.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t jenkins-web-app .'
            }
        }


        stage('Run New Container') {
            steps {
                sh 'https://github.com/sivasankari004/cake-bake.git'
            }
        }

    }
}