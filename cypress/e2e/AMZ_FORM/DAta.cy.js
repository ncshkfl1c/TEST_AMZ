const hello = {
  "OVERALL_CONDITION:DOES_THE_UNIT_HAVE_TWO_KEYS_WITH_FOBS_AVAILABLE": null,
  "OVERALL_CONDITION:IS_THE_UNIT_EXTERIOR_CLEAN": null,
  "OVERALL_CONDITION:IS_THE_INTERIOR_FREE_OF_STRONG_ODORS": null,
  "OVERALL_CONDITION:IS_THE_UNIT_INTERIOR_CLEAN_AND_FREE_OF_RUBBISH": null,
  "DRIVER_DOOR:IS_DOOR_OPERATIONAL": null,
  "DRIVER_DOOR:IS_DOOR_FRAME_FREE_OF_CRACKS_AT_HINGE_OR_OTHER_ATTACHMENT_POINT":
    null,
  "DRIVER_DOOR:IS_DOOR_STRAP_INTACT": null,
  "DRIVER_MIRROR:IS_THE_MARKER_SIGNAL_LAMP_OPERABLE": null,
  "HOOD:DOES_HOOD_OPERATE_FREELY": null,
  "LIGHTS:DO_HEADLIGHTS_ILLUMINATE": null,
  "LIGHTS:DO_MARKER_LIGHTS_ILLUMINATE": null,
  "BUMPER:IS_LICENSE_PLATE_INSTALLED_IF_APPLICABLE": null,
  "PASSENGER_MIRROR:IS_THE_MARKER_SIGNAL_LAMP_OPERABLE": null,
  "PASSENGER_DOOR_EXTERIOUR:IS_DOOR_OPERATIONAL": null,
  "PASSENGER_DOOR_EXTERIOUR:IS_DOOR_FRAME_FREE_OF_CRACKS_AT_HINGE_OR_OTHER_ATTACHMENT_POINT":
    null,
  "PASSENGER_DOOR_EXTERIOUR:IS_DOOR_STRAP_INTACT_RAM_ONLY": null,
  "RH_CARGO_DOOR:DOES_THE_DOOR_OPERATE_SMOOTHLY_AND_CORRECT__CV_ONLY": null,
  "STEP:IS_THE_RH_STEP_PRESENT_CV_ONLY": null,
  "STEP:IS_THE_STEP_FREE_FROM_DAMAGE_CV_ONLY": null,
  "STEP:ARE_THE_STEP_END_CAPS_INTACT_CV_ONLY": null,
  "RH_BODY_PANEL:IS_THE_AMAZON_BRANDING_FREE_OF_DAMAGE": null,
  "RH_REAR_DOOR:IS_DOOR_OPERATIONAL_CV_ONLY": null,
  "RH_REAR_DOOR:IS_DOOR_FRAME_FREE_OF_CRACKS_AT_HINGE_OR_OTHER_ATTACHMENT_POINT_CV_ONLY":
    null,
  "RH_REAR_DOOR:IS_DOOR_STRAP_INTACT_CV_ONLY": null,
  "LH_REAR_DOOR:IS_DOOR_OPERATIONAL_CV_ONLY": null,
  "LH_REAR_DOOR:IS_DOOR_FRAME_FREE_OF_CRACKS_AT_HINGE_OR_OTHER_ATTACHMENT_POINT_CV_ONLY":
    null,
  "LH_REAR_DOOR:IS_DOOR_STRAP_INTACT_CV_ONLY": null,
  "ROLLUP_DOOR:IS_DOOR_OPERATIONAL_CV_CDV_ONLY": null,
  "TAIL_LIGHTS:ARE_THE_BULBS_OPERATIONAL": null,
  "REAR_STEP:IS_THE_RH_STEP_PRESENT": null,
  "REAR_STEP:IS_THE_STEP_FREE_FROM_DAMAGE": null,
  "REAR_STEP:ARE_THE_STEP_END_CAPS_INTACT": null,
  "SPARE_TIRE:IS_THE_SPARE_TIRE_PRESENT_CV_ONLY": null,
  "LICENSE_PLATE:IS_LICENSE_PLATE_INSTALLED": null,
  "DRIVER_COCKPIT:DOES_VEHICLE_START": null,
  "DRIVER_COCKPIT:IS_THE_VEHICLE_RUNNING_SMOOTHLY": null,
  "DRIVER_COCKPIT:IS_THE_DASHBOARD_FREE_OF_ANY_WARNING_LIGHTS": null,
  "DRIVER_COCKPIT:IS_INSTRUMENT_CLUSTER_FREE_OF_DAMAGE": null,
  "DRIVER_COCKPIT:IS_STEERING_WHEEL_FREE_OF_DAMAGE": null,
  "DRIVER_COCKPIT:IS_PARKING_BRAKE_OPERATIONAL": null,
  "DRIVER_COCKPIT:IS_THE_REAR_VIEW_CAMERA_OPERATIONAL": null,
  "DRIVER_COCKPIT:IS_THE_NETRADYNECAMERATELEMATICS_DEVICE_SECURE": null,
  "DRIVER_COCKPIT:IS_SEAT_BELT_FREE_OF_DAMAGE": null,
  "DRIVER_COCKPIT:DOES_SEAT_BELT_PROPERLY_BUCKLE": null,
  "DRIVER_COCKPIT:IS_DRIVER_SEAT_FREE_OF_DAMAGE": null,
  "DRIVER_COCKPIT:IS_AREA_CLEAN": null,
  "DRIVER_COCKPIT:IS_VEHICLE_REGISTRATION_IN_VEHICLE": null,
  "DRIVER_COCKPIT:IS_SAFETY_KIT_PRESENT": null,
  "PASSENGER_AREA:IS_SEAT_BELT_FREE_OF_DAMAGE": null,
  "PASSENGER_AREA:DOES_SEAT_BELT_PROPERLY_BUCKLE": null,
  "PASSENGER_AREA:IS_DRIVER_SEAT_FREE_OF_DAMAGE": null,
  "PASSENGER_AREA:ARE_THE_INTERIORS_FREE_OF_ANY_OBVIOUS_DAMAGE": null,
  "PASSENGER_AREA:IS_THE_CABIN_FREE_OF_ANY_SMOKE_ODORS": null,
  "DIVIDER_DOOR:IS_THE_DIVIDER_DOOR_OPERATIONAL": null,
  "DIVIDER_DOOR:DOES_THE_DOOR_LATCH_OPEN": null,
  "DIVIDER_DOOR:DOES_THE_DOOR_LATCH_CLOSE": null,
  "CARGO_AREA:ARE_CARGO_SHELVES_PRESENT": null,
  "CARGO_AREA:IS_THE_CARGO_AREA_FREE_OF_DAMAGE": null,
  "CARGO_AREA:IS_THE_AREA_CLEAN": null,
  "CARGO_AREA:ARE_INTERIOR_LIGHTS_OPERATIONAL": null,
  "CARGO_AREA:IS_WHEEL_DOLLY_PRESENT": null,
  "FRAME__STRUCTURAL__UNIBODY:IS_THE_STRUCTURE_OR_UNIBODY_FREE_OF_ANY_OBVIOUS_DAMAGE":
    null,
  "ENGINE_OR_MECHANICAL_DAMAGE:IS_THE_ENGINE_FREE_OF_ANY_MECHANICAL_DAMAGES":
    null,
  "ELECTRICAL:ARE_ALL_THE_ELECTRICAL_EQUIPMENT_AND_ACCESSORIES_OPERABLE": null,
};

let Arrays = []

for (let key in hello) {
    const MyArray = key.split(":",)
    Arrays.push(MyArray)
}

console.log(Arrays)