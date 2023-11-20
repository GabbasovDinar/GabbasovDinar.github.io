$(document).ready(function () {

    var ringer = {
        countdown_to: "12/03/2023 16:30:00",
        rings: {
            DAYS: {
                s: 86400000,
                max: 365
            },
            HOURS: {
                s: 3600000,
                max: 24
            },
            MINUTES: {
                s: 60000,
                max: 60
            },
            SECONDS: {
                s: 1000,
                max: 60
            }
        },
        r_count: 4,
        r_spacing: 10,
        r_size: 100,
        r_thickness: 2,
        update_interval: 11,

        init: function () {
            $r = ringer;
            $r.cvs = document.createElement("canvas");

            $r.size = {
                w: ($r.r_size + $r.r_thickness) * $r.r_count + $r.r_spacing * ($r.r_count - 1),
                h: $r.r_size + $r.r_thickness
            };

            $r.cvs.setAttribute("width", $r.size.w);
            $r.cvs.setAttribute("height", $r.size.h);
            $r.ctx = $r.cvs.getContext("2d");
            document.querySelector(".wedding-date-timer").appendChild($r.cvs);
            $r.ctx.textAlign = "center";
            $r.actual_size = $r.r_size + $r.r_thickness;
            $r.countdown_to_time = new Date($r.countdown_to).getTime();
            $r.go();
        },
        ctx: null,
        go: function () {
            var idx = 0;

            $r.time = new Date($r.countdown_to_time - new Date().getTime());
            for (var r_key in $r.rings) {
                $r.unit(idx++, r_key, $r.rings[r_key]);
            }
            setTimeout($r.go, $r.update_interval);
        },
        unit: function (idx, label, ring) {
            var x, y, value, ring_secs = ring.s;

            value = parseFloat($r.time / ring_secs);
            $r.time -= Math.round(parseInt(value)) * ring_secs;
            value = Math.abs(value);

            x = $r.r_size * 0.5 + $r.r_thickness * 0.5;
            x += +(idx * ($r.r_size + $r.r_spacing + $r.r_thickness));
            y = $r.r_size * 0.5;
            y += $r.r_thickness * 0.5;

            var degrees = (value / ring.max) * 360.0;
            var endAngle = degrees * (Math.PI / 180) - (0.5 * Math.PI);

            $r.ctx.save();

            $r.ctx.translate(x, y);
            $r.ctx.clearRect($r.actual_size * -0.5, $r.actual_size * -0.5, $r.actual_size, $r.actual_size);

            $r.ctx.strokeStyle = "rgba(128,128,128,0.2)";
            $r.ctx.beginPath();
            $r.ctx.arc(0, 0, $r.r_size / 2, -0.5 * Math.PI, 1.5 * Math.PI, 2);
            $r.ctx.lineWidth = $r.r_thickness;
            $r.ctx.stroke();

            $r.ctx.strokeStyle = "rgba(255,255,255,0.9)";
            $r.ctx.beginPath();
            $r.ctx.arc(0, 0, $r.r_size / 2, -0.5 * Math.PI, endAngle, false); // Changed to false for clockwise
            $r.ctx.lineWidth = $r.r_thickness;
            $r.ctx.stroke();

            $r.ctx.fillStyle = "#ffffff";

            $r.ctx.font = "12px Montserrat";
            $r.ctx.fillText(label, 0, 23);

            $r.ctx.font = "bold 40px Montserrat";
            $r.ctx.fillText(Math.floor(value), 0, 10);

            $r.ctx.restore();
        }
    };

    ringer.init();


});
