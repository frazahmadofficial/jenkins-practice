pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'echo "Fraz Jenkins Application" > app.txt'
                sh 'ls -l app.txt'
            }
        }


        stage('Test') {
            steps {
                sh 'test -f app.txt'
                echo 'Test passed: app.txt exists.'
            }
        }


        stage('Secret Check') {
            steps {
                withCredentials([string(credentialsId: 'demo-secret', variable: 'DEMO_SECRET')]) {
                    sh 'test -n "$DEMO_SECRET"'
                    echo 'Secret loaded securely without displaying it.'
                }
            }
        }


        stage('Deploy') {
            steps {
                sh 'mkdir -p deployed'
                sh 'cp app.txt deployed/'
                sh 'ls -l deployed/app.txt'
                echo ' Automatic deployment completed.'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }

        failure {
            echo 'Pipeline failed. Check Console Output.'
        }
    }
}
