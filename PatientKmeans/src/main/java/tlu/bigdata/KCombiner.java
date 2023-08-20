package tlu.bigdata;

import org.apache.hadoop.fs.FSDataOutputStream;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.mapreduce.Reducer;

import java.io.BufferedWriter;
import java.io.IOException;
import java.io.OutputStreamWriter;

public class KCombiner extends Reducer<LongWritable, PointWritable, LongWritable, PointWritable> {

    public void reduce(LongWritable centroidId, Iterable<PointWritable> points, Context context)
            throws IOException, InterruptedException {

        String outputFolder = "/patient-output-points/";
        String outputFileName = "Cluster" + centroidId.toString() + ".txt";

        FileSystem hdfs = FileSystem.get(context.getConfiguration());
        FSDataOutputStream dos = hdfs.create(new Path(outputFolder + outputFileName), true);
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(dos));

        bw.write("Cluster" + centroidId + ": ");
        bw.newLine();

        PointWritable ptSum = PointWritable.copy(points.iterator().next());
        PointWritable firstPoint = PointWritable.copy(ptSum);

        bw.write(firstPoint.toString());
        bw.newLine();

        while (points.iterator().hasNext()) {
            PointWritable currentPoint = points.iterator().next();
            bw.write(currentPoint.toString());
            bw.newLine();
            ptSum.sum(currentPoint);
        }

        bw.close();
        hdfs.close();

        context.write(centroidId, ptSum);
    }
}