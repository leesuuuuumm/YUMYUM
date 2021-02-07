package com.web.curation.service.eureka;

import com.web.curation.model.eureka.Eureka;
import com.web.curation.model.eureka.FindNearEurekaRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EurekaService {

    /**
     * 두 지점간의 거리 계산
     *
     * @param lat1 지점 1 위도
     * @param lon1 지점 1 경도
     * @param lat2 지점 2 위도
     * @param lon2 지점 2 경도
     * @param unit 거리 표출단위
     * @return
     */
    private double calDistance(double lat1, double lon1, double lat2, double lon2, String unit) {

        double theta = lon1 - lon2;
        double dist = Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.cos(deg2rad(theta));

        dist = Math.acos(dist);
        dist = rad2deg(dist);
        dist = dist * 60 * 1.1515;

        if (unit == "kilometer") {
            dist *= 1.609344;
        } else if(unit == "meter"){
            dist *= 1609.344;
        }

        return (dist);
    }

    public List<Eureka> getNearEurekaList(List<Eureka> allEurekas, FindNearEurekaRequest request) {
        Double lat = request.getLat();
        Double lon = request.getLon();
        Double distance = request.getDistance();

        List<Eureka> resultList = new ArrayList<>();

        for (Eureka eureka : allEurekas) {
            double calDistance = calDistance(lat, lon, eureka.getLat(), eureka.getLon(), "meter");
            if (calDistance <= distance) {
                resultList.add(eureka);
            }
        }

        return resultList;
    }

    // This function converts decimal degrees to radians
    private double deg2rad(double deg) {
        return (deg * Math.PI / 180.0);
    }

    // This function converts radians to decimal degrees
    private double rad2deg(double rad) {
        return (rad * 180 / Math.PI);
    }
}
