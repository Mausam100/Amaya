// filepath: c:\Users\kushw\OneDrive\Desktop\Amaya\src\components\Model.jsx
import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations, Text } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/Amaya1.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions) {
      Object.values(actions).forEach((action) => action.play());
    }
  }, [actions]);

  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
    >
      <group name="Scene">
        <group name="Sketchfab_model" position={[0, 0, 0]} rotation={[0, 0, 0]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[0, 0, 0]}>
              <group name="Sketchfab_model_0" rotation={[0, 0, 0]}>
                <group name="root_1">
                  <group name="GLTF_SceneRootNode_2" rotation={[0, 0, 0]}>
                    <group
                      name="Background_12_27"
                      position={[1.902, 1.722, -0.71]}
                    >
                      <group name="Object_28_28" />
                    </group>
                    <group
                      name="Board002_13_29"
                      position={[-1.377, 0, -1.82]}
                      rotation={[Math.PI, -0.682, Math.PI]}
                    >
                      <group name="Object_30_30">
                        <mesh
                          name="Object_47"
                          castShadow
                          receiveShadow
                          geometry={nodes.Object_47.geometry}
                          material={materials.Items_baked}
                        />
                      </group>
                    </group>
                    <group
                      name="Building002_14_31"
                      position={[0.679, 0, -0.705]}
                      rotation={[Math.PI, 0, Math.PI]}
                    >
                      <group name="Object_32_32">
                        <mesh
                          name="Object_50"
                          castShadow
                          receiveShadow
                          geometry={nodes.Object_50.geometry}
                          material={materials.Building_Baked}
                        />
                      </group>
                    </group>
                    <group
                      name="chara_0_3"
                      position={[-2.531, 1.034, -2.24]}
                      rotation={[Math.PI / 2, 0, -0.763]}
                      scale={1.752}
                    >
                      <group name="Object_4_4">
                        <mesh
                          name="Object_8"
                          castShadow
                          receiveShadow
                          geometry={nodes.Object_8.geometry}
                          material={materials.chara}
                        />
                      </group>
                    </group>
                    <group
                      name="Coffee_Boiler_3_9"
                      position={[0.927, 1.012, -2.5]}
                      rotation={[0, -Math.PI / 2, 0]}
                    >
                      <group name="Object_10_10">
                        <mesh
                          name="Object_17"
                          castShadow
                          receiveShadow
                          geometry={nodes.Object_17.geometry}
                          material={materials.Items_specular}
                        />
                      </group>
                    </group>
                    <group
                      position={[-1.3, 0.72, -2.5]}
                      rotation={[0, -Math.PI / 2, 0]}
                    >
                      <Text
                        color=""
                        position={[0.927, 1.012, -1.5]}
                        fontSize={0.1}
                        maxWidth={1} // Set a maximum width for the text
                        lineHeight={1.2} // Adjust line height as needed
                      >
                        Welcome to Amaya Café – A digital café experience like
                        never before!
                      </Text>
                      <Text
                        color=""
                        position={[1.87, 1.6, 1.1]}
                        fontSize={0.2}
                        maxWidth={1} // Set a maximum width for the text
                        lineHeight={1.2} // Adjust line height as needed
                        >
                       
                        Amaya
                      </Text>
                    </group>
                    <group
                      name="Cup001_5_13"
                      position={[0.945, 0.735, -0.969]}
                      rotation={[Math.PI, 0, Math.PI]}
                    >
                      <group name="Object_14_14">
                        <mesh
                          name="Object_23"
                          castShadow
                          receiveShadow
                          geometry={nodes.Object_23.geometry}
                          material={materials.Items}
                        />
                      </group>
                    </group>
                    <group
                      name="Cup002_6_15"
                      position={[-1.996, 0.735, 0.172]}
                      rotation={[0, 1.428, 0]}
                    >
                      <group name="Object_16_16">
                        <mesh
                          name="Object_26"
                          castShadow
                          receiveShadow
                          geometry={nodes.Object_26.geometry}
                          material={materials.Items}
                        />
                      </group>
                    </group>
                    <group
                      name="Cup003_7_17"
                      position={[-1.48, 0.735, 0.242]}
                      rotation={[0, 1.428, 0]}
                    >
                      <group name="Object_18_18">
                        <mesh
                          name="Object_29"
                          castShadow
                          receiveShadow
                          geometry={nodes.Object_29.geometry}
                          material={materials.Items}
                        />
                      </group>
                    </group>
                    <group
                      name="Cup_4_11"
                      position={[0.923, 0.735, -0.4]}
                      rotation={[Math.PI, 0, Math.PI]}
                    >
                      <group name="Object_12_12">
                        <mesh
                          name="Object_20"
                          castShadow
                          receiveShadow
                          geometry={nodes.Object_20.geometry}
                          material={materials.Items}
                        />
                      </group>
                    </group>
                    <group
                      name="Kettle_8_19"
                      position={[0.753, 1.012, -2.653]}
                      scale={1.015}
                    >
                      <group name="Object_20_20">
                        <mesh
                          name="Object_32"
                          castShadow
                          receiveShadow
                          geometry={nodes.Object_32.geometry}
                          material={materials.Items_specular}
                        />
                      </group>
                    </group>
                    <group
                      name="Menu001_10_23"
                      position={[-1.845, 0.735, 0.385]}
                      rotation={[0, 1.428, 0]}
                    >
                      <group name="Object_24_24">
                        <mesh
                          name="Object_38"
                          castShadow
                          receiveShadow
                          geometry={nodes.Object_38.geometry}
                          material={materials.Items}
                        />
                      </group>
                    </group>
                    <group
                      name="Menu_9_21"
                      position={[0.79, 0.735, -0.664]}
                      rotation={[Math.PI, 0, Math.PI]}
                    >
                      <group name="Object_22_22">
                        <mesh
                          name="Object_35"
                          castShadow
                          receiveShadow
                          geometry={nodes.Object_35.geometry}
                          material={materials.Items}
                        />
                      </group>
                    </group>
                    <group
                      name="NoBakeStatic_15_33"
                      position={[-2.765, 1.647, -3.884]}
                    >
                      <group name="Object_34_34">
                        <mesh
                          name="Object_53"
                          castShadow
                          receiveShadow
                          geometry={nodes.Object_53.geometry}
                          material={materials.Items}
                        />
                      </group>
                      <group name="Object_35_35">
                        <mesh
                          name="Object_55"
                          castShadow
                          receiveShadow
                          geometry={nodes.Object_55.geometry}
                          material={materials["Items_emission.001"]}
                        />
                      </group>
                      <group name="Object_36_36">
                        <mesh
                          name="Object_57"
                          castShadow
                          receiveShadow
                          geometry={nodes.Object_57.geometry}
                          material={materials.Desserts}
                        />
                      </group>
                      <group name="Object_37_37">
                        <mesh
                          name="Object_59"
                          castShadow
                          receiveShadow
                          geometry={nodes.Object_59.geometry}
                          material={materials.Foliage}
                        />
                      </group>
                      <group name="Object_38_38">
                        <mesh
                          name="Object_61"
                          castShadow
                          receiveShadow
                          geometry={nodes.Object_61.geometry}
                          material={materials.FoliageNoSpecular}
                        />
                      </group>
                    </group>
                    <group name="Plate_11_25" position={[0.365, 1.012, -2.539]}>
                      <group name="Object_26_26">
                        <mesh
                          name="Object_41"
                          castShadow
                          receiveShadow
                          geometry={nodes.Object_41.geometry}
                          material={materials.Items}
                        />
                      </group>
                    </group>
                    <group
                      name="Teapot001_2_7"
                      position={[-1.719, 0.735, 0.212]}
                      rotation={[0, 1.428, 0]}
                    >
                      <group name="Object_8_8">
                        <mesh
                          name="Object_14"
                          castShadow
                          receiveShadow
                          geometry={nodes.Object_14.geometry}
                          material={materials.Items}
                        />
                      </group>
                    </group>
                    <group
                      name="Teapot_1_5"
                      position={[1.111, 0.735, -0.676]}
                      rotation={[Math.PI, -0.31, Math.PI]}
                    >
                      <group name="Object_6_6">
                        <mesh
                          name="Object_11"
                          castShadow
                          receiveShadow
                          geometry={nodes.Object_11.geometry}
                          material={materials.Items}
                        />
                      </group>
                    </group>
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/Amaya1.glb");
