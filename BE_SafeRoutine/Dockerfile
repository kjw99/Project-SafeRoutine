# FROM openjdk:17-jdk
# ARG JAR_FILE=./build/libs/*.jar
# COPY ${JAR_FILE} app.jar
# EXPOSE 8080
# ENTRYPOINT ["java", "-Dspring.profiles.active=docker", "-jar", "app.jar"]

FROM openjdk:17-jdk
WORKDIR /app
COPY build/libs/*.jar app.jar
EXPOSE 8081
CMD ["java", "-jar", "app.jar"]