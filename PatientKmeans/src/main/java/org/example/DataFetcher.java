package org.example;

import java.io.*;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FSDataOutputStream;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

public class DataFetcher {

    public static void fetchAndWriteDataToHDFS(Configuration conf, String inputFilePath) {

        String apiUrl = "http://127.0.0.1:3000/api/patients";

        try {
            CloseableHttpClient httpClient = HttpClients.createDefault();
            HttpGet httpGet = new HttpGet(apiUrl);
            HttpResponse response = httpClient.execute(httpGet);

            // Lấy mã HTTP trả về
            int statusCode = response.getStatusLine().getStatusCode();
            System.out.println("HTTP Response Code: " + statusCode);

            // Đọc nội dung của response
            String responseBody = EntityUtils.toString(response.getEntity());

            FileSystem hdfs = FileSystem.get(conf);
            Path filePath = new Path(inputFilePath);

            if (hdfs.exists(filePath)) {
                hdfs.delete(filePath, true);
                System.out.println("Deleted existing file: " + filePath);
            }
            try {
                FSDataOutputStream dos = hdfs.create(filePath, true);
                BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(dos));
                bw.write(responseBody);
                bw.close();
                System.out.println("Created file: " + filePath);
            } catch (IOException e) {
                e.printStackTrace();
            }

            hdfs.close();

            httpClient.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}


