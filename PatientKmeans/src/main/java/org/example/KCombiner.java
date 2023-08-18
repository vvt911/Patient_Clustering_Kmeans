package org.example;

import org.apache.hadoop.fs.FSDataOutputStream;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.mapreduce.Reducer;

import java.io.BufferedWriter;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.List;

public class KCombiner extends Reducer<LongWritable, PointWritable, LongWritable, PointWritable> {

    public void reduce(LongWritable centroidId, Iterable<PointWritable> points, Context context)
            throws IOException, InterruptedException {

        List<PointWritable> pointList = new ArrayList<>();

        String outputFolder = "/patient-output-points/";
        String outputFileName = "Cluster" + centroidId.toString() + ".txt";

        FileSystem hdfs = FileSystem.get(context.getConfiguration());
        FSDataOutputStream dos = hdfs.create(new Path(outputFolder + outputFileName), true);
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(dos));

        bw.write("Cluster" + centroidId.toString() + ": ");
        bw.newLine();

        for (PointWritable point : points) {
            bw.write(point.toString());
            bw.newLine();
            pointList.add(PointWritable.copy(point));
        }

        bw.close();
        hdfs.close();

        PointWritable ptSum = PointWritable.copy(pointList.get(0));
        for (int i = 1; i < pointList.size(); i++) {
            ptSum.sum(pointList.get(i));
        }

        context.write(centroidId, ptSum);
    }
}
